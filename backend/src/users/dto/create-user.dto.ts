import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  description: string;
}