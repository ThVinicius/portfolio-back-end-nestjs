import { Injectable } from '@nestjs/common';
import { PrismaUserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }
}
