import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../shared/prisma/prisma.service.js';
import { generatePasswordHash } from '../shared/utils/generatePasswordHash.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await generatePasswordHash(createUserDto.password);
    const result = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        passwordHash: passwordHash,
      },
    });

    return result.id;
  }

  async findAll() {
    const result = await this.prisma.user.findMany({
      omit: { passwordHash: true },
    });
    return result;
  }

  async findOne(id: string) {
    const result = await this.prisma.user.findUnique({
      where: { id: id },
      omit: { passwordHash: true },
    });
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.prisma.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
      },
    });
    return result;
  }

  async remove(id: string) {
    const result = await this.prisma.user.delete({
      where: { id: id },
    });
    return result;
  }

  async findByEmail(email: string) {
    const result = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return result;
  }
}
