import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  createAccessToken({ id, username }: UserEntity) {
    const payload: UserPayload = { sub: id, username };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedError(
        'O endereço de e-mail ou a senha fornecidos estão incorretos.',
      );
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      console.log('senha errada!');
      throw new UnauthorizedError(
        'O endereço de e-mail ou a senha fornecidos estão incorretos.',
      );
    }

    return user;
  }
}
