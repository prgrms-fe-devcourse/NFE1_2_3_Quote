import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../schemas/user.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'id',
  'email',
  'nickname',
  'profileImage',
  'myPosts',
  'bookMarkedPosts',
] as const) {}
