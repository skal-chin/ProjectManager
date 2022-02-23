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
  isComplete : boolean;
  assignTo : string;
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

  @Get('/project_owner/:id')
  public async showOwnerEmail(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    const projectOwner = (await this.usersService.find(jwtBody.userId)).email;

    return { projectOwner };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : ProjectPostBody) {
    let project = new Project();
    project.title = body.title;
    project.description = body.description;
    project.deadline = body.deadline;
    project.isComplete = false;
    project.ownerId = jwtBody.userId;
    project.ownerEmail = (await this.usersService.find(jwtBody.userId)).email;

    const createdProject = await this.projectsService.createProject(project);
    
    const currentUser = await this.usersService.find(jwtBody.userId);
    const newUserProject = new UserProject();
    newUserProject.projectId = createdProject.id;
    newUserProject.userId = currentUser.id;
    newUserProject.contextId = Math.random.toString().substring(2, 8);

    await this.projectsService.createUserProject(newUserProject);
    
    if (body.userInvite) {
      console.log(body.userInvite);
      
      const getUser = await this.usersService.findByEmail(body.userInvite);
      const otherUser = getUser[0];
      
      const otherUserProject = new UserProject();
      otherUserProject.projectId = createdProject.id;
      otherUserProject.userId = otherUser.id;
      otherUserProject.contextId = Math.random.toString().substring(2, 8);
      await this.projectsService.createUserProject(otherUserProject);
    }

    return { project };
  }

  @Put('/projects/:id')
  public async update(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto, @Body() body : ProjectPostBody) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    if (project.ownerId !== jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }

    project.title = body.title;
    project.description = body.description;
    project.deadline = body.deadline;
    project.isComplete = body.isComplete;

    if (body.assignTo) {
      
      const getUser = await this.usersService.findByEmail(body.assignTo);
      const otherUser = getUser[0];
      
      const otherUserProject = new UserProject();
      otherUserProject.projectId = project.id;
      otherUserProject.userId = otherUser.id;
      otherUserProject.contextId = Math.random.toString().substring(2, 8);
      await this.projectsService.createUserProject(otherUserProject);
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