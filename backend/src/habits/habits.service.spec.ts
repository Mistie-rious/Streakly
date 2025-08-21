import { Test, TestingModule } from '@nestjs/testing';
import { HabitsService } from './habits.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Frequency } from './types';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

describe('HabitsService', () => {
  let service: HabitsService;

  const mockPrisma = {
    habit: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    habitTrack: {
      deleteMany: jest.fn(),
    },
    reminder: {
      deleteMany: jest.fn(),
    },
  };

  const habitMock = (overrides = {}) => ({
    id: '1',
    userId: 'user1',
    tracks: [],
    reminders: [],
    completedToday: false,
    history: [],
    ...overrides,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return habits for a user with default pagination', async () => {
      const habits = [habitMock()];
      mockPrisma.habit.findMany.mockResolvedValue(habits);

      const result = await service.list('user1');

      expect(mockPrisma.habit.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        include: { reminders: true, tracks: { take: 7, orderBy: { date: 'desc' } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        skip: 0,
      });
      expect(result).toEqual(habits);
    });

    it('should return habits for a user with custom pagination', async () => {
      const habits = [habitMock({ id: '2' })];
      mockPrisma.habit.findMany.mockResolvedValue(habits);

      const result = await service.list('user1', 5, 5);

      expect(mockPrisma.habit.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        include: { reminders: true, tracks: { take: 7, orderBy: { date: 'desc' } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        skip: 5,
      });
      expect(result).toEqual(habits);
    });
  });

  describe('create', () => {
    it('should create a new habit', async () => {
      const dto: CreateHabitDto = { name: 'Exercise', description: 'Morning workout', frequency: Frequency.DAILY };
      const habit = habitMock({ ...dto });
      mockPrisma.habit.create.mockResolvedValue(habit);

      const result = await service.create('user1', dto);

      expect(mockPrisma.habit.create).toHaveBeenCalledWith({
        data: { ...dto, userId: 'user1' },
        include: { tracks: true, reminders: true },
      });
      expect(result).toEqual(habit);
    });
  });

  describe('get', () => {
    it('should return habit if found and belongs to user', async () => {
      const habit = habitMock();
      mockPrisma.habit.findFirst.mockResolvedValue(habit);

      const result = await service.get('user1', '1');
      expect(result).toEqual(habit);
    });

    it('should throw NotFoundException if habit does not exist', async () => {
      mockPrisma.habit.findFirst.mockResolvedValue(null);
      await expect(service.get('user1', '1')).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if habit belongs to another user', async () => {
      const habit = habitMock({ userId: 'user2' });
      mockPrisma.habit.findFirst.mockResolvedValue(habit);

      await expect(service.get('user1', '1')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should update habit if user owns it', async () => {
      const habit = habitMock();
      const dto: UpdateHabitDto = { name: 'Updated habit' };
      mockPrisma.habit.findFirst.mockResolvedValue(habit);
      mockPrisma.habit.update.mockResolvedValue({ ...habit, ...dto });

      const result = await service.update('user1', '1', dto);

      expect(mockPrisma.habit.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: dto,
      });
      expect(result).toEqual({ ...habit, ...dto });
    });
  });

  describe('remove', () => {
    it('should delete habit and related reminders and tracks', async () => {
      const habit = habitMock();
      mockPrisma.habit.findFirst.mockResolvedValue(habit);
      mockPrisma.reminder.deleteMany.mockResolvedValue({});
      mockPrisma.habitTrack.deleteMany.mockResolvedValue({});
      mockPrisma.habit.delete.mockResolvedValue(habit);

      const result = await service.remove('user1', '1');

      expect(mockPrisma.reminder.deleteMany).toHaveBeenCalledWith({ where: { habitId: '1' } });
      expect(mockPrisma.habitTrack.deleteMany).toHaveBeenCalledWith({ where: { habitId: '1' } });
      expect(mockPrisma.habit.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(habit);
    });
  });
});
