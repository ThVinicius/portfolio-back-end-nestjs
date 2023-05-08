import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
