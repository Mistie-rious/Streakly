import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register with correct parameters and return the user', async () => {
      const dto: RegisterDto = { email: 'test@test.com', password: 'password', username: 'tester' };
      const mockUser = { id: '1', email: dto.email, username: dto.username };

      (mockAuthService.register as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.register(dto);

      expect(mockAuthService.register).toHaveBeenCalledWith(dto.email, dto.password, dto.username);
      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should call authService.login with correct parameters and return a token', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'pass123' };
      const mockToken = { access_token: 'mockToken' };

      (mockAuthService.login as jest.Mock).mockResolvedValue(mockToken);

      const result = await controller.login(dto);

      expect(mockAuthService.login).toHaveBeenCalledWith(dto.email, dto.password);
      expect(result).toEqual(mockToken);
    });
  });
});
