import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          email: user.email,
          name: user.name,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken() {}

  async login(email: string, password: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Email or password is incorrect!');
    }

    return this.createToken(foundUser);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }

  async forget(email: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Email is incorrect!');
    }

    //TODO: enviar e-mail para o usuario

    return true;
  }

  async reset(password: string, token: string) {
    // TODO: validar token e alterar a senha do usuario
    const id = 'uuid';

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }
}
