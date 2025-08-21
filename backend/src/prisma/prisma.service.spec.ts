import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService (mocked)', () => {
  let service: PrismaService;

  const mockPrisma = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    habit: { findMany: jest.fn(), create: jest.fn() },
    reminder: { findMany: jest.fn(), create: jest.fn() },
    habitTrack: { findMany: jest.fn(), create: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call $connect', async () => {
    await service.$connect();
    expect(mockPrisma.$connect).toHaveBeenCalled();
  });
});
