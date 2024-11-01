import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'comments',
};
@Schema(options)
export class Comments extends Document {
  @ApiProperty({ description: '댓글 작성자 id', required: true })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;

  @ApiProperty({ description: '댓글 본문', required: true })
  @Prop({ required: true })
  contents: string;

  @ApiProperty({ description: '작성 대상 (게시글)', required: true })
  @Prop({ type: Types.ObjectId, ref: 'Post', required: true }) // Post 컬렉션을 참조하는 필드
  postId: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
