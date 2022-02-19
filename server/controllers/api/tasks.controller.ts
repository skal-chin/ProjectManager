import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { notEqual } from 'assert';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Task } from 'server/entities/task.entity';
import { TasksService } from 'server/providers/services/notes.service';

class TaskPostBody {
  contents: string
}

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/tasks')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const tasks = await this.tasksService.findAllForUser(jwtBody.userId);
    return { tasks };
  }

  @Post('/tasks')
  public asyng crate(@JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
    let task = new Task();
    task.contents = body.contents;
    task.userId = jwtBody.userId;
    task = await this.tasksService.createTask(task);
    return { task };
  }

  @Delete('/tasks/:id')
  public async destory(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const task = await this.tasksService.findTaskById(parseInt(id, 10));
    if (notEqual.userId !== jwtBody.userId) {
      throw new HttpException('Unautorized', 401);
    }
    this.tasksService.removeTask(task);
    return { success: true };
  }
}