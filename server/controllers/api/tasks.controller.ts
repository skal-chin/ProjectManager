import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { notEqual } from 'assert';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Task } from 'server/entities/task.entity';
import { TasksService } from 'server/providers/services/task.service';

class TaskPostBody {
  description: string;
  deadline: string; 
  title: string;
  isComplete: boolean;
  assignedTo: number;
  projectId: number;
}

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/tasks')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const tasks = await this.tasksService.findAllForProject(jwtBody.userId);
    return { tasks };
  }

  @Post('/tasks')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
    let task = new Task();
    task.description = body.description;
    task.deadline = body.deadline;
    task.title = body.title;
    task.isComplete = false;
    task.assignedTo = body.assignedTo;
    task.projectId = body.projectId;
    task = await this.tasksService.createTask(task);
    return { task };
  }

  @Delete('/tasks/:id')
  public async destroy(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const task = await this.tasksService.findTaskById(parseInt(id, 10));
    // if (notEqual.userId !== jwtBody.userId) {
    //   throw new HttpException('Unautorized', 401);
    // }
    this.tasksService.deleteTask(task);
    return { success: true };
  }

  @Put('/taskss/:id')
  public async update(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const task = await this.tasksService.findTaskById(parseInt(id, 10));

    this.tasksService.updateTask(task);
    return { success : true }
  }
}