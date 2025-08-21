import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
describe('UsersService', () => {
  let service: UsersService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('me', () => {
    it('returns user data for given id', async () => {
      const mockUser = { id: 'user1', username: 'testuser', email: 'test@test.com' };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.me('user1');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user1' },
        select: expect.anything(),
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('updates user if exists', async () => {
      const dto: UpdateUserDto = { username: 'newname', email: 'newemail@test.com' };
      const mockUser = { id: 'user1', username: 'newname', email: 'newemail@test.com' };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.update.mockResolvedValue(mockUser);

      const result = await service.update('user1', dto);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 'user1' } });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user1' },
        data: dto,
        select: expect.anything(),
      });
      expect(result).toEqual(mockUser);
    });

    it('throws NotFoundException if user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.update('user1', { username: 'new' })).rejects.toThrow(NotFoundException);
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });
});
