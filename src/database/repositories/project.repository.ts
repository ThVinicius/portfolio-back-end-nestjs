import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectRepositoryInterface } from 'src/project/project.repositoty.interface';
import { ReturnProjectsDTO } from 'src/project/dtos/return-projects.dto';

@Injectable()
export class PrismaProjectRepository implements ProjectRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<ReturnProjectsDTO> {
    return await this.prisma.projects.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        image: true,
        position: true,
        badges: { select: { name: true, image: true } },
        links: { select: { id: true, label: true, href: true } },
      },
    });
  }
}
