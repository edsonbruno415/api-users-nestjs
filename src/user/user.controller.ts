import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdatePatchUserDTO } from 'src/dto/update-patch-user.dto';
import { UpdatePutUserDTO } from 'src/dto/update-put-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    const { name, email, password } = body;
    return { name, email, password };
  }

  @Get()
  async getAll() {
    return { users: [] };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePutUserDTO,
  ) {
    return { method: 'put', id, body };
  }

  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePatchUserDTO,
  ) {
    return { method: 'patch', id, body };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { method: 'delete', id };
  }
}
