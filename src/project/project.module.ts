import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaProjectRepository } from 'src/database/repositories/project.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [PrismaProjectRepository, ProjectService],
})
export class ProjectModule {}
