import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        password,
      },
    });
  }
}
