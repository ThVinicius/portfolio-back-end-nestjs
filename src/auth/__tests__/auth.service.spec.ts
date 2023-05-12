import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors/unauthorized.error';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, JwtModule],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('createAccessToken', () => {
    it('should return a token', () => {
      const token = 'access_token_JWT';
      const user = {
        id: 1,
        username: 'test',
        password: '123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(token);

      const response = authService.createAccessToken(user);

      expect(jwtService.sign).toBeCalledTimes(1);
      expect(jwtService.sign).toBeCalledWith({
        sub: user.id,
        username: user.username,
      });

      expect(response).toStrictEqual({ access_token: token });
    });
  });

  describe('validateUser', () => {
    it('should return the user if you pass the correct username and password', async () => {
      const user = {
        id: 1,
        username: 'test',
        password: '123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => true);

      const response = await authService.validateUser(
        user.username,
        user.password,
      );

      expect(userService.findByUsername).toBeCalledTimes(1);
      expect(userService.findByUsername).toBeCalledWith(user.username);

      expect(bcrypt.compare).toBeCalledTimes(1);

      expect(response).toBe(user);
    });

    it('should throw unauthorized error if user is not registered', () => {
      const user = { username: 'non-registered', password: '123' };

      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(null);

      const promise = authService.validateUser(user.username, user.password);

      expect(userService.findByUsername).toBeCalledTimes(1);
      expect(userService.findByUsername).toBeCalledWith(user.username);

      expect(promise).rejects.toBeInstanceOf(UnauthorizedError);
    });

    it('should throw unauthorized error if user is registered but password is wrong', () => {
      const user = {
        id: 1,
        username: 'test',
        password: '123',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const wrongPassword = '1234';

      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => false);

      const promise = authService.validateUser(user.username, wrongPassword);

      expect(userService.findByUsername).toBeCalledTimes(1);
      expect(userService.findByUsername).toBeCalledWith(user.username);

      expect(bcrypt.compare).toBeCalledTimes(1);

      expect(promise).rejects.toBeInstanceOf(UnauthorizedError);
    });
  });
});
