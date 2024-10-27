import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Post } from '../schemas/post.schema';
import { IsString } from 'class-validator';
import { PopulatedDoc, Types } from 'mongoose';
export class AuthorInfoDto {
  _id: string;
  nickname: string;
  profileImage: string;
}

export class PostResponseDto extends OmitType(Post, ['authorId']) {
  authorId: AuthorInfoDto | string;
}
export class PostPreviewResponseDto extends OmitType(Post, [
  'content',
  'postImage',
  'authorId',
] as const) {
  authorId: PopulatedDoc<Omit<AuthorInfoDto, 'profileImage'> & Document>;
}
