import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaUserRepository } from '../../database/repositories/user.repository';
import { PrismaModule } from '../../database/prisma.module';

describe('UserService', () => {
  let service: UserService;
  let userRepository: PrismaUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService],
    }).compile();

    userRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
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

      jest.spyOn(userRepository, 'findByUsername').mockResolvedValueOnce(user);

      const response = await service.findByUsername(user.username);

      expect(userRepository.findByUsername).toBeCalledTimes(1);
      expect(userRepository.findByUsername).toBeCalledWith(user.username);

      expect(response).toBe(user);
    });

    it('should return null if you pass a username not registered in the database', async () => {
      const username = 'not-registered';

      jest.spyOn(userRepository, 'findByUsername').mockResolvedValueOnce(null);

      const response = await service.findByUsername(username);

      expect(userRepository.findByUsername).toBeCalledTimes(1);
      expect(userRepository.findByUsername).toBeCalledWith(username);

      expect(response).toBe(null);
    });
  });
});
