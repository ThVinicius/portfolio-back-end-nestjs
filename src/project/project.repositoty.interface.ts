import { CreateProjectDTO } from './dtos/create-project.dto';
import { ReturnProjectsDTO } from './dtos/return-projects.dto';
import { ProjectEntity } from './entities/project.entity';

export interface ProjectRepositoryInterface {
  getAll(): Promise<ReturnProjectsDTO>;

  add(payload: CreateProjectDTO): Promise<ProjectEntity>;
}
