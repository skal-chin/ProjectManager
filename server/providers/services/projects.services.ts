import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository : Repository<Project>,
    @InjectRepository(UserProject)
    private userProjectsRepository: Repository<UserProject>,
  ) {}

  // findAllForUser(userId : number) : Promise<Project[]> {
  //   return this.projectRepository.find({
  //     where : { userId },
  //   });
  // }

  createProject(project : Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  findProjectById(projectId : number) {
    return this.projectRepository.findOne(projectId);
  }

  removeProject(project : Project) {
    return this.projectRepository.delete(project);
  }

  updateProject(project : Project) {
    return this.projectRepository.update(project.id, project);
  }

  createUserProject(userProject : UserProject): Promise<UserProject> {
    return this.userProjectsRepository.save(userProject);
  }

  findAllForUser(userId : number) : Promise<UserProject[]> {
    return this.userProjectsRepository.find({ where : { userId }})
  }

  addUserToProject(userId : number, projectId : number) {
    const userProject = new UserProject();
    userProject.userId = userId;
    userProject.projectId = projectId;
    userProject.contextId = Math.random.toString().substring(2, 8);
    return this.userProjectsRepository.save(userProject);
  }
}
