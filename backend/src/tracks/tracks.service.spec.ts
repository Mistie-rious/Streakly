import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';

describe('TracksService', () => {
  let service: TracksService;

  const mockPrismaService = {
    habit: {
      findUnique: jest.fn(),
    },
    habitTrack: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracksService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TracksService>(TracksService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add', () => {
    const userId = 'user1';
    const habitId = 'habit1';
    const dateISO = '2025-08-19';

    it('creates a track if habit exists and user owns it', async () => {
      const habitId = 'habit1';
      const userId = 'user1';
      const dateISO = '2025-08-19';
    
      // Mock habit lookup
      mockPrismaService.habit.findUnique.mockResolvedValue({ id: habitId, userId });
    
      // Mock track creation
      mockPrismaService.habitTrack.create.mockResolvedValue({
        id: 'track1',
        habitId,
        date: new Date(dateISO),
      });
    
      const result = await service.add(userId, habitId, dateISO);
    
      expect(result).toEqual({ id: 'track1', habitId, date: new Date(dateISO) });
      expect(mockPrismaService.habitTrack.create).toHaveBeenCalledWith({
        data: { habitId, date: new Date(dateISO) },
      });
    });
    
    

    it('throws NotFoundException if habit does not exist', async () => {
      mockPrismaService.habit.findUnique.mockResolvedValue(null);
      await expect(service.add(userId, habitId, dateISO)).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException if user does not own habit', async () => {
      mockPrismaService.habit.findUnique.mockResolvedValue({ id: habitId, userId: 'otherUser' });
      await expect(service.add(userId, habitId, dateISO)).rejects.toThrow(ForbiddenException);
    });

    it('throws ConflictException if track already exists', async () => {
      mockPrismaService.habit.findUnique.mockResolvedValue({ id: habitId, userId });
      mockPrismaService.habitTrack.create.mockRejectedValue({ code: 'P2002' });
      await expect(service.add(userId, habitId, dateISO)).rejects.toThrow(ConflictException);
    });
  });

  describe('list', () => {
    const userId = 'user1';
    const habitId = 'habit1';

    beforeEach(() => {
      mockPrismaService.habit.findUnique.mockResolvedValue({ id: habitId, userId });
    });

    it('returns tracks for habit with default pagination', async () => {
      const tracks = [{ id: 'track1', habitId, date: new Date() }];
      mockPrismaService.habitTrack.findMany.mockResolvedValue(tracks);

      const result = await service.list(userId, habitId);

      expect(mockPrismaService.habitTrack.findMany).toHaveBeenCalledWith({
        where: { habitId },
        orderBy: { date: 'desc' },
        take: 10,
        skip: 0,
      });
      expect(result).toEqual(tracks);
    });

    it('returns tracks with custom pagination and date filter', async () => {
      const tracks = [{ id: 'track2', habitId, date: new Date() }];
      mockPrismaService.habitTrack.findMany.mockResolvedValue(tracks);

      const result = await service.list(userId, habitId, '2025-08-01', '2025-08-31', 5, 5);

      expect(mockPrismaService.habitTrack.findMany).toHaveBeenCalledWith({
        where: {
          habitId,
          date: { gte: new Date('2025-08-01'), lte: new Date('2025-08-31') },
        },
        orderBy: { date: 'desc' },
        take: 5,
        skip: 5,
      });
      expect(result).toEqual(tracks);
    });
  });

  describe('remove', () => {
    const userId = 'user1';
    const habitId = 'habit1';
    const trackId = 'track1';

    beforeEach(() => {
      mockPrismaService.habit.findUnique.mockResolvedValue({ id: habitId, userId });
    });

    it('deletes a track if habit and ownership are valid', async () => {
      mockPrismaService.habitTrack.findUnique.mockResolvedValue({ id: trackId, habitId });
      mockPrismaService.habitTrack.delete.mockResolvedValue({ id: trackId, habitsId: habitId, date: new Date() });

      const result = await service.remove(userId, habitId, trackId);

      expect(result).toEqual({ id: trackId, habitsId: habitId, date: expect.any(Date) });
      expect(mockPrismaService.habitTrack.delete).toHaveBeenCalledWith({ where: { id: trackId } });
    });

    it('throws NotFoundException if track does not exist', async () => {
      mockPrismaService.habitTrack.findUnique.mockResolvedValue(null);
      await expect(service.remove(userId, habitId, trackId)).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException if user does not own habit', async () => {
   
      mockPrismaService.habitTrack.findUnique.mockResolvedValue({ id: trackId, habitId });
    
     
      mockPrismaService.habit.findUnique.mockResolvedValue({ id: habitId, userId: 'otherUser' });
    
      await expect(service.remove(userId, habitId, trackId)).rejects.toThrow(ForbiddenException);
    });
    
  });
});
