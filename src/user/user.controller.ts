import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { validate as uuidValidate } from 'uuid';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    data.birthAt = data.birthAt ? new Date(data.birthAt).toISOString() : null;
    return this.userService.create(data);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const isValidUUID = uuidValidate(id);
    if (!isValidUUID) throw new BadRequestException('Invalid UUID format');
    return this.userService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePutUserDTO) {
    const isValidUUID = uuidValidate(id);
    if (!isValidUUID) throw new BadRequestException('Invalid UUID format');
    data.birthAt = data.birthAt ? new Date(data.birthAt).toISOString() : null;
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Param('id') id: string, @Body() data: UpdatePatchUserDTO) {
    const isValidUUID = uuidValidate(id);
    if (!isValidUUID) throw new BadRequestException('Invalid UUID format');
    if (data.birthAt) data.birthAt = new Date(data.birthAt).toISOString();
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const isValidUUID = uuidValidate(id);
    if (!isValidUUID) throw new BadRequestException('Invalid UUID format');
    return this.userService.remove(id);
  }
}
