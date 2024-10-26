import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Post } from '../schemas/post.schema';
import { IsString } from 'class-validator';

export class PostResponseDto extends Post {}
export class PostPreviewResponseDto extends OmitType(Post, [
  'content',
  'postImage',
] as const) {}
