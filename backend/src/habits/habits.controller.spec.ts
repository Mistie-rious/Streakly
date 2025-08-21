import { Test, TestingModule } from '@nestjs/testing';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { PaginationDto } from './dto/get-habit.dto';
import { Frequency } from './types';

describe('HabitsController', () => {
  let controller: HabitsController;
  let mockHabitsService: Partial<HabitsService>;

  beforeEach(async () => {
    mockHabitsService = {
      list: jest.fn(),
      get: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [{ provide: HabitsService, useValue: mockHabitsService }],
    }).compile();

    controller = module.get<HabitsController>(HabitsController);
  });

  describe('list', () => {
    it('should call service.list with user id and default pagination', async () => {
      const req = { sub: 'user1' };
      const habits = [{ id: 'h1' }];
      (mockHabitsService.list as jest.Mock).mockResolvedValue(habits);

      const query: PaginationDto = {};
      const result = await controller.list(req.sub, query);

      expect(mockHabitsService.list).toHaveBeenCalledWith(req.sub, 10, 0, undefined);
      expect(result).toEqual(habits);
    });

    it('should call service.list with user id and custom pagination', async () => {
      const req = { sub: 'user1' };
      const habits = [{ id: 'h1' }];
      (mockHabitsService.list as jest.Mock).mockResolvedValue(habits);

      const query: PaginationDto = { limit: 5, offset: 5 };
      const result = await controller.list(req.sub, query);

      expect(mockHabitsService.list).toHaveBeenCalledWith(req.sub, 5, 5, undefined);
      expect(result).toEqual(habits);
    });
  });

  describe('get', () => {
    it('should call service.get with user id, habit id, and default pagination', async () => {
      const user = { sub: 'user1' };
      const habitId = 'h1';
      const habit = { id: habitId };
      (mockHabitsService.get as jest.Mock).mockResolvedValue(habit);

      const query: PaginationDto = {};
      const result = await controller.get(user, habitId, query);

      expect(mockHabitsService.get).toHaveBeenCalledWith(user.sub, habitId, 10, 0);
      expect(result).toEqual(habit);
    });
  });

  describe('create', () => {
    it('should call service.create with user id and DTO', async () => {
      const user = { sub: 'user1' };
      const dto = { name: 'New Habit', frequency: Frequency.DAILY };
      const createdHabit = { id: 'h1', ...dto };
      (mockHabitsService.create as jest.Mock).mockResolvedValue(createdHabit);

      const result = await controller.create(user, dto);

      expect(mockHabitsService.create).toHaveBeenCalledWith(user.sub, dto);
      expect(result).toEqual(createdHabit);
    });
  });

  describe('update', () => {
    it('should call service.update with user id, habit id, and DTO', async () => {
      const user = { sub: 'user1' };
      const habitId = 'h1';
      const dto = { name: 'Updated Habit' };
      const updatedHabit = { id: habitId, ...dto };
      (mockHabitsService.update as jest.Mock).mockResolvedValue(updatedHabit);

      const result = await controller.update(user, habitId, dto);

      expect(mockHabitsService.update).toHaveBeenCalledWith(user.sub, habitId, dto);
      expect(result).toEqual(updatedHabit);
    });
  });

  describe('remove', () => {
    it('should call service.remove with user id and habit id', async () => {
      const user = { sub: 'user1' };
      const habitId = 'h1';
      (mockHabitsService.remove as jest.Mock).mockResolvedValue(habitId);

      const result = await controller.remove(user, habitId);

      expect(mockHabitsService.remove).toHaveBeenCalledWith(user.sub, habitId);
      expect(result).toEqual(habitId);
    });
  });
});
