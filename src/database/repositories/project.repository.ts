import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectRepositoryInterface } from '../../project/project.repositoty.interface';
import { ReturnProjectsDTO } from '../../project/dtos/return-projects.dto';
import { CreateProjectDTO } from '../../project/dtos/create-project.dto';
import { ProjectEntity } from '../../project/entities/project.entity';
import { Badge } from '../../project/decorators/badges-validator.decorator';

@Injectable()
export class PrismaProjectRepository implements ProjectRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async add(payload: CreateProjectDTO): Promise<ProjectEntity> {
    const { badges, links, name, description, image, type, position } = payload;

    const connectBadges = badges.filter(
      (badge) => typeof badge === 'string',
    ) as string[];

    const createBadges = badges.filter(
      (badge) => typeof badge !== 'string',
    ) as Badge[];

    return await this.prisma.projects.create({
      data: {
        name,
        type,
        description,
        image,
        position,
        badges: {
          connect: connectBadges.map((badge) => ({ name: badge })),
          create: createBadges,
        },
        links: { createMany: { data: links } },
      },
      include: { links: true, badges: true },
    });
  }

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
