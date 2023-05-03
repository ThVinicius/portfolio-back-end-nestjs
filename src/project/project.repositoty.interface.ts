import { ReturnProjectsDTO } from './dtos/return-projects.dto';

export interface ProjectRepositoryInterface {
  getAll(): Promise<ReturnProjectsDTO>;
}
