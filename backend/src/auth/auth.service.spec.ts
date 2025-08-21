import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwt = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('throws if email already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: '1', email: 'test@test.com' });

      await expect(service.register('test@test.com', 'password')).rejects.toThrow(BadRequestException);
    });

    it('registers a user and returns user object', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({ id: '1', email: 'test@test.com', password: 'hashed', username: undefined });
    
      const result = await service.register('test@test.com', 'password');
    
      expect(result).toEqual({ id: '1', email: 'test@test.com', username: undefined });
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });
    
  });

  describe('login', () => {
    it('throws if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.login('test@test.com', 'password')).rejects.toThrow(UnauthorizedException);
    });

    it('throws if password is invalid', async () => {
      const user = { id: '1', email: 'test@test.com', password: await bcrypt.hash('pass', 12) };
      mockPrisma.user.findUnique.mockResolvedValue(user);

      await expect(service.login('test@test.com', 'wrong')).rejects.toThrow(UnauthorizedException);
    });

    it('logs in successfully', async () => {
      const user = { id: '1', email: 'test@test.com', password: await bcrypt.hash('password', 12) };
      mockPrisma.user.findUnique.mockResolvedValue(user);
      mockJwt.signAsync.mockResolvedValue('jwt-token');

      const result = await service.login('test@test.com', 'password');
      expect(result).toEqual({ access_token: 'jwt-token' });
    });
  });
});
