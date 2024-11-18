import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private readonly users: Map<string, User> = new Map();

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
    };
    this.users.set(user.id, user);
    return user;
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  remove(id: string): void {
    this.users.delete(id);
  }
}