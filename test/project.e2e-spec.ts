import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProjectModule } from './../src/project/project.module';
import { PrismaService } from '../src/database/prisma.service';

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
      const projects = await prisma.projects.findMany({
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
});
