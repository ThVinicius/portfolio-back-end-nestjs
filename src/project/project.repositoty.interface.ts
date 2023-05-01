import { ProjectEntity } from './entities/project.entity';

export interface ProjectRepositoryInterface {
  getAll(): Promise<ProjectEntity[]>;
}
