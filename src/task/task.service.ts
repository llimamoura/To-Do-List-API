import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const result = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        userId: userId,
      },
    });

    return result;
  }

  async findAll(userId: string) {
    const result = await this.prisma.task.findMany({
      where: { userId },
    });
    return result;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const result = await this.prisma.task.update({
      where: { id: id },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        done: updateTaskDto.done,
      },
    });
    return result;
  }

  async remove(id: string) {
    const result = await this.prisma.task.delete({
      where: { id: id },
    });
    return result;
  }
}
