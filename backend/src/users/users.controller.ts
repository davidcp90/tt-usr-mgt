import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<User[]> {
    return this.usersService.findAll(page, limit);
  }

  @Post()
  create(@Body() userData: Omit<User, 'id'>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}