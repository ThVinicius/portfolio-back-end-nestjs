import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProjectModule } from './../src/project/project.module';
import { PrismaService } from '../src/database/prisma.service';
import { ProjectTypeEnum } from '../src/project/enums/type.enum';
import { ProjectLinkEnum } from '../src/project/enums/link.enum';
import { ProjectEntity } from 'src/project/entities/project.entity';

describe('ProjectController (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/api/projects (GET)', () => {
    it('should return all projects', async () => {
      const projects = await prisma.project.findMany({
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

      const response = await request(app.getHttpServer()).get('/api/projects');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(projects);
    });
  });

  describe('/api/projects (POST)', () => {
    it('should save a project if you pass all data correctly', async () => {
      const project = {
        name: 'test',
        type: ProjectTypeEnum.FullStack,
        description: 'test',
        image: 'https://google.com',
        badges: ['react', 'node'],
        links: [{ label: ProjectLinkEnum.Deploy, href: 'https://google.com' }],
      };

      const response = await request(app.getHttpServer())
        .post('/api/projects')
        .send(project);

      const body = response.body as ProjectEntity;

      expect(response.statusCode).toBe(201);

      expect(body.name).toBe(project.name);
      expect(body.description).toBe(project.description);
      expect(body.image).toBe(project.image);

      await prisma.project.delete({ where: { id: body.id } });
    });
  });
});
