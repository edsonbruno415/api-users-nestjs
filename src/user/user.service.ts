import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { Crypto } from 'src/crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password, birthAt, role }: CreateUserDTO) {
    password = await Crypto.createhash(password);

    return this.prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        birthAt,
        role,
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

  async update(id: string, { name, email, password, birthAt, role }: UpdatePutUserDTO) {
    await this.exists(id);
    password = await Crypto.createhash(password);
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        birthAt,
        role,
        updatedAt: new Date(),
      },
    });
  }

  async updatePartial(id: string, data: UpdatePatchUserDTO) {
    await this.exists(id);
    if (data.password) data.password = await Crypto.createhash(data.password);
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    await this.exists(id);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    const existsUser = await this.getById(id);
    if (!existsUser) {
      throw new NotFoundException('User not found');
    }
    return true;
  }
}
