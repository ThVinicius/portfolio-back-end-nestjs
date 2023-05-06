import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../project.service';
import { PrismaProjectRepository } from '../../database/repositories/project.repository';
import { ProjectTypeEnum } from '../enums/type.enum';
import { ProjectLinkEnum } from '../enums/link.enum';

describe('ProjectService', () => {
  let service: ProjectService;

  const projectRepositoryMock = {
    getAll: jest.fn(),
    add: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: PrismaProjectRepository, useValue: projectRepositoryMock },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  describe('getAll', () => {
    it('should return all projects', async () => {
      const projects = [{ id: 1, name: 'teste', type: 'FullStack' }];

      projectRepositoryMock.getAll.mockResolvedValueOnce(projects);

      const result = await service.getAll();

      expect(projectRepositoryMock.getAll).toBeCalled();
      expect(result).toBe(projects);
    });
  });

  describe('add', () => {
    it('should add project', async () => {
      const payload = {
        name: 'test',
        type: ProjectTypeEnum.FullStack,
        description: 'test',
        image: 'https://google.com',
        badges: ['react', 'node'],
        links: [{ label: ProjectLinkEnum.Deploy, href: 'https://google.com' }],
      };
      const project = { id: 1, ...payload };

      projectRepositoryMock.add.mockResolvedValueOnce(project);

      const result = await service.add(payload);

      expect(projectRepositoryMock.add).toBeCalledTimes(1);
      expect(result).toBe(project);
    });
  });
});
