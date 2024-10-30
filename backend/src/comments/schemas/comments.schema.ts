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
  @ApiProperty({
    description: '작성자 id',
    required: true,
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  //이게 몽고디비에서 id의 타입. 몽고디비가 자동으로 string으로 바꿔주긴하는데
  //db에서 핸들링할때는 object임.
  @IsNotEmpty()
  authorId: Types.ObjectId;

  @ApiProperty({
    description: '댓글 본문',
    required: true,
  })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '작성대상 (게시글)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, required: true })
  //이게 몽고디비에서 id의 타입. 몽고디비가 자동으로 string으로 바꿔주긴하는데
  //db에서 핸들링할때는 object임.
  @IsNotEmpty()
  postId: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
