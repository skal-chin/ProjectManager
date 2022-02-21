import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { User } from 'server/entities/user.entity';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';
import { UsersService } from 'server/providers/services/users.service'
import { ProjectsService } from 'server/providers/services/projects.services';

class ProjectPostBody {
  title : string;
  description : string;
  deadline : string;
  ownerId : number;
  userInvite : string;
}

@Controller()
export class ProjectsController {
  constructor(
    private projectsService : ProjectsService,
    private usersService : UsersService,
    ) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody : JwtBodyDto) {
    const projects = await this.projectsService.findAllForUser(jwtBody.userId);
    return { projects };
  }

  @Get('/projects/:id')
  public async show(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    return { project };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : ProjectPostBody) {
    let project = new Project();
    project.title = body.title;
    project.description = body.description;
    project.deadline = body.deadline;
    project.isComplete = false;
    project.ownerId = jwtBody.userId;
    
    const currentUser = await this.usersService.find(jwtBody.userId);
    const newUserProject = new UserProject();
    newUserProject.projectId = project.id;
    newUserProject.userId = currentUser.id;
    newUserProject.contextId = Math.random.toString().substring(2, 8);

    project.userProjects = [newUserProject];
    currentUser.userProjects = [newUserProject];
    console.log('UserProject Added');
    

    // currentUser.userProjects = [...currentUser.userProjects, newUserProject];
    this.usersService.update(currentUser);
    console.log('After User update');
    
    // project = await this.projectsService.createProject(project);
    console.log('After project create');
    

    if (body.userInvite) {
      const otherUser = await this.usersService.findByEmail(body.userInvite)[0];
      otherUser.userProjects = [...otherUser.userProjects, newUserProject];
      this.usersService.update(otherUser);
    }

    return { project };
  }

  @Put('/projects/:id')
  public async update(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    if (project.ownerId !== jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }

    this.projectsService.updateProject(project);
    return { success : true }
  }

  @Delete('/projects/:id')
  public async delete(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    if (project.ownerId !== jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }
    this.projectsService.removeProject(project);
    return{ success : true};
  }
}