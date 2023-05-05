import { Injectable } from '@nestjs/common';
import { PrismaProjectRepository } from '../database/repositories/project.repository';
import { CreateProjectDTO } from './dtos/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: PrismaProjectRepository) {}

  async getAll() {
    return await this.projectRepository.getAll();
  }

  async add(project: CreateProjectDTO) {
    return await this.projectRepository.add(project);
  }
}
