import { Injectable } from '@nestjs/common';
import { PrismaProjectRepository } from '../database/repositories/project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: PrismaProjectRepository) {}

  async getAll() {
    return await this.projectRepository.getAll();
  }
}
