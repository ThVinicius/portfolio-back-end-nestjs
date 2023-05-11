import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaUserRepository } from '../../database/repositories/user.repository';

describe('UserService', () => {
  let service: UserService;
  const userRepositoryMock = { findByUsername: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaUserRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByUsername', () => {
    it('should return a user if you pass a username registered in the database ', async () => {
      const user = {
        id: 1,
        username: 'test',
        password: '123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      userRepositoryMock.findByUsername.mockResolvedValueOnce(user);

      const response = await service.findByUsername(user.username);

      expect(userRepositoryMock.findByUsername).toBeCalledTimes(1);
      expect(userRepositoryMock.findByUsername).toBeCalledWith(user.username);

      expect(response).toBe(user);
    });

    it('should return null if you pass a username not registered in the database', async () => {
      const username = 'not-registered';

      userRepositoryMock.findByUsername.mockResolvedValueOnce(null);

      const response = await service.findByUsername(username);

      expect(userRepositoryMock.findByUsername).toBeCalledTimes(1);
      expect(userRepositoryMock.findByUsername).toBeCalledWith(username);

      expect(response).toBe(null);
    });
  });
});
