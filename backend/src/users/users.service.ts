import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private redisClient;

  constructor() {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    this.redisClient.connect();
  }

  async findAll(page: number = 1, limit: number = 50): Promise<User[]> {
    const users = await this.redisClient.get('users');
    const parsedUsers = users ? JSON.parse(users) : [];
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return parsedUsers.slice(startIndex, endIndex);
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const users = await this.findAll();
    const newUser = { id: Date.now().toString(), ...userData };
    users.push(newUser);
    await this.redisClient.set('users', JSON.stringify(users));
    return newUser;
  }

  async remove(id: string): Promise<void> {
    let users = await this.findAll();
    users = users.filter(user => user.id !== id);
    await this.redisClient.set('users', JSON.stringify(users));
  }
}