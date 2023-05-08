import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../database/prisma.module';
import { PrismaUserRepository } from '../database/repositories/user.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaUserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
