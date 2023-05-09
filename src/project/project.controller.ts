import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dtos/create-project.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @IsPublic()
  @Get()
  async getAll() {
    return this.projectService.getAll();
  }

  @Post()
  async add(@Body() body: CreateProjectDTO) {
    return await this.projectService.add(body);
  }
}
