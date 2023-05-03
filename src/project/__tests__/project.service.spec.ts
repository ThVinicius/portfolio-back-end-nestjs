import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../project.service';
import { PrismaProjectRepository } from '../../database/repositories/project.repository';

describe('ProjectService', () => {
  let service: ProjectService;

  const projectRepositoryMock = {
    getAll: jest.fn(),
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
});
