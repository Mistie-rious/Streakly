import { Test, TestingModule } from '@nestjs/testing';
import { HabitsService } from './habits.service';
import { PrismaService } from '../prisma/prisma.service';
import { Frequency } from './types';
describe('HabitsService', () => {
  let service: HabitsService;
  let mockPrisma: any;

  beforeEach(async () => {
    mockPrisma = {
      habit: {
        findMany: jest.fn(),
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      habitTrack: {
        deleteMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
  });

  describe('list', () => {
    it('should return habits for a user with default pagination', async () => {
      mockPrisma.habit.findMany.mockResolvedValue([]);

      const result = await service.list('user1');

      expect(mockPrisma.habit.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        include: { tracks: { take: 7, orderBy: { date: 'desc' } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        skip: 0,
      });

      expect(result).toEqual([]);
    });

    it('should return habits for a user with custom pagination', async () => {
      mockPrisma.habit.findMany.mockResolvedValue([]);

      const result = await service.list('user1', 5, 5);

      expect(mockPrisma.habit.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        include: { tracks: { take: 7, orderBy: { date: 'desc' } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        skip: 5,
      });

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new habit', async () => {
      const dto = { name: 'Exercise', frequency: Frequency.DAILY };
      mockPrisma.habit.create.mockResolvedValue({ ...dto, userId: 'user1', tracks: [] });

      const result = await service.create('user1', dto);

      expect(mockPrisma.habit.create).toHaveBeenCalledWith({
        data: { ...dto, userId: 'user1' },
        include: { tracks: true },
      });

      expect(result).toEqual({ ...dto, userId: 'user1', tracks: [] });
    });
  });
  describe('remove', () => {
    it('should delete habit and related tracks', async () => {
      const habit = {
        id: '1',
        userId: 'user1',
        name: 'Exercise',
        description: null,
        frequency: Frequency.DAILY,
        createdAt: new Date(),
        updatedAt: new Date(),
        tracks: [],
        completedToday: false,
        history: [],
      };
  
      jest.spyOn(service, 'get').mockResolvedValue(habit);
      mockPrisma.habitTrack.deleteMany.mockResolvedValue({ count: 0 });
      mockPrisma.habit.delete.mockResolvedValue(habit);
  
      const result = await service.remove('user1', '1');
  
      expect(mockPrisma.habitTrack.deleteMany).toHaveBeenCalledWith({ where: { habitId: '1' } });
      expect(mockPrisma.habit.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(habit);
    });
  });
});
