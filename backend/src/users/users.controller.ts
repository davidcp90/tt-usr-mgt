import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  remove(@Param('id') id: string): void {
    this.usersService.remove(id);
  }
}