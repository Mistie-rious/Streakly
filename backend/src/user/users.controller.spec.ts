import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    me: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('me', () => {
    it('calls service.me with correct user id and returns result', async () => {
      const mockUser = { sub: 'user1' };
      const mockResult = { id: 'user1', username: 'testuser' };
      mockUsersService.me.mockResolvedValue(mockResult);

      const result = await controller.me(mockUser);

      expect(mockUsersService.me).toHaveBeenCalledWith(mockUser.sub);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('calls service.update with correct parameters and returns updated user', async () => {
      const mockUser = { sub: 'user1' };
      const dto: UpdateUserDto = { username: 'newname', email: 'newemail@test.com' };
      const mockResult = { id: 'user1', username: 'newname', email: 'newemail@test.com' };
      mockUsersService.update.mockResolvedValue(mockResult);

      const result = await controller.update(mockUser, dto);

      expect(mockUsersService.update).toHaveBeenCalledWith(mockUser.sub, dto);
      expect(result).toEqual(mockResult);
    });
  });
});
