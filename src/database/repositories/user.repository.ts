import { UserEntity } from 'src/user/entities/user.entity';
import { PrismaService } from '../prisma.service';
import { UserRepositoryInterface } from './../../user/user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
