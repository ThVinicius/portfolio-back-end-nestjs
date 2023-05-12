import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './repositories/user.repository';
import { PrismaProjectRepository } from './repositories/project.repository';

@Module({
  providers: [PrismaService, PrismaProjectRepository, PrismaUserRepository],
  exports: [PrismaService, PrismaProjectRepository, PrismaUserRepository],
})
export class PrismaModule {}
