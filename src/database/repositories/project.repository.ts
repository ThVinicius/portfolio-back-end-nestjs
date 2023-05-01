import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectRepositoryInterface } from 'src/project/project.repositoty.interface';
import { ProjectEntity } from 'src/project/entities/project.entity';

@Injectable()
export class PrismaProjectRepository implements ProjectRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<ProjectEntity[]> {
    return await this.prisma.projects.findMany({
      include: { badges: true, links: true },
    });
  }
}
