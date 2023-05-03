import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaProjectRepository } from '../database/repositories/project.repository';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [PrismaProjectRepository, ProjectService],
})
export class ProjectModule {}
