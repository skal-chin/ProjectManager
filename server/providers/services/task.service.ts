import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Task {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAllForProject(projectId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { projectId },
    });
  }

  findTaskById(id: number) {
    return this.taskRepository.findOne(id);
  }

  createTask(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  deleteTask(task: Task) {
    this.taskRepository.delete(task);
  }

  updateTask(task : Task) {
    return this.taskRepository.update(task.id, task);
  }
}