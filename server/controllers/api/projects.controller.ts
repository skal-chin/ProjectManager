import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { ProjectsService } from 'server/providers/services/projects.services';

class ProjectPostBody {
  title : string;
  description : string;
  deadline : string;
  isComplete : boolean;
  ownerId : number;
}

@Controller()
export class ProjectsController {
  constructor(private projectsService : ProjectsService) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody : JwtBodyDto) {
    const projects = await this.projectsService.findAllForUser(jwtBody.userId);
    return { projects };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : ProjectPostBody) {
    let project = new Project();
    project.title = body.title;
    project.description = body.description;
    project.deadline = body.deadline;
    project.isComplete = false;
    project.ownerId = jwtBody.userId;
    project = await this.projectsService.createProject(project);
    return { project };
  }
}