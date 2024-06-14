import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password, birthAt }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        birthAt,
      },
    });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, { name, email, password, birthAt }: UpdatePutUserDTO) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        birthAt,
      },
    });
  }

  async updatePartial(id: string, data: UpdatePatchUserDTO) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
