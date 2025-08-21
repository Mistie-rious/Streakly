import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { QueryTracksDto } from './dto/query-tracks.dto';

describe('TracksController', () => {
  let controller: TracksController;

  const mockTracksService = {
    add: jest.fn(),
    list: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
      providers: [{ provide: TracksService, useValue: mockTracksService }],
    }).compile();

    controller = module.get<TracksController>(TracksController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('add', () => {
    it('calls service.add with correct parameters', async () => {
      const mockUser = { sub: 'user1' };
      const habitId = 'habit1';
      const dto: CreateTrackDto = { date: '2025-08-19' };

      mockTracksService.add.mockResolvedValue({ id: 'track1', habitId, date: dto.date });

      const result = await controller.add(mockUser, habitId, dto);

      expect(mockTracksService.add).toHaveBeenCalledWith(mockUser.sub, habitId, dto.date);
      expect(result).toEqual({ id: 'track1', habitId, date: dto.date });
    });
  });

  describe('list', () => {
    const mockUser = { sub: 'user1' };
    const habitId = 'habit1';

    it('calls service.list with correct parameters (without pagination)', async () => {
      const query: QueryTracksDto = { start: '2025-08-01', end: '2025-08-31' };
      const tracks = [{ id: 'track1', habitId, date: '2025-08-19' }];

      mockTracksService.list.mockResolvedValue(tracks);

      const result = await controller.list(
        mockUser,
        habitId,
        query
      );

      expect(mockTracksService.list).toHaveBeenCalledWith(
        mockUser.sub,
        habitId,
        query.start,
        query.end,
        undefined,
        undefined
      );
      expect(result).toEqual(tracks);
    });

    it('calls service.list with correct parameters (with custom pagination)', async () => {
      const query: QueryTracksDto = {
        start: '2025-08-01',
        end: '2025-08-31',
        limit: 5,
        offset: 5,
      };
      const tracks = [{ id: 'track2', habitId, date: '2025-08-20' }];
    
      mockTracksService.list.mockResolvedValue(tracks);
    
      // Pass the DTO object directly, not individual args
      const result = await controller.list(mockUser, habitId, query);
    
      expect(mockTracksService.list).toHaveBeenCalledWith(
        mockUser.sub,
        habitId,
        query.start,
        query.end,
        query.limit,
        query.offset,
      );
      expect(result).toEqual(tracks);
    });
    
  });

  describe('remove', () => {
    it('calls service.remove with correct parameters', async () => {
      const mockUser = { sub: 'user1' };
      const habitId = 'habit1';
      const trackId = 'track1';

      mockTracksService.remove.mockResolvedValue({ id: trackId, habitId, date: '2025-08-19' });

      const result = await controller.remove(mockUser, habitId, trackId);

      expect(mockTracksService.remove).toHaveBeenCalledWith(mockUser.sub, habitId, trackId);
      expect(result).toEqual({ id: trackId, habitId, date: '2025-08-19' });
    });
  });
});
