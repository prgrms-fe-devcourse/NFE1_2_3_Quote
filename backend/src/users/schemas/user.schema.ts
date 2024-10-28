import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';
import { _PostSchema } from 'src/posts/schemas/post.schema';

const options: SchemaOptions = {
  collection: 'users',
  timestamps: true,
};
@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: '6719bd69cf2a692f1ed23e35',
    description: '유저 id',
  })
  id: string; // _id 대신 명시적으로 id를 선언

  @ApiProperty({
    example: '2024-09-01T00:00:00.000Z',
    description: '계정 생성일',
    default: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'exampleName1',
    description: 'nickname',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    example: 'ExamplePassword1',
    description: '대문자나 소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호',
    required: true,
  })
  @Prop({ required: false })
  @IsString()
  @IsNotEmpty()
  // @MinLength(8)
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  //   message: 'Password too weak',
  // })
  password: string;

  @ApiProperty({
    example: 'example.jpg',
    description: '유저 프로필 이미지',
    required: false,
  })
  @Prop({
    //회원가입 시 기본이미지 지정.
    default:
      'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
  })
  @IsString()
  profileImage: string;

  @ApiProperty({
    example: ['6719bd69cf2a692f1ed23e35'],
    description: '유저가 작성한 게시글 id 배열',
    required: false,
  })
  @Prop({ type: [Types.ObjectId], ref: 'Post', default: [] }) // 사용자 게시글 ID 배열
  myPosts: Types.ObjectId[];

  @ApiProperty({
    example: ['6719bd69cf2a692f1ed23e35'],
    description: '유저가 좋아요를 누른 게시글 id 배열',
    required: false,
  })
  @Prop({ type: [Types.ObjectId], ref: 'Post', default: [] }) // 좋아요한 게시글 ID 배열
  bookMarkedPosts: Types.ObjectId[];

  readonly readOnlyData: {
    id: string;
    createdAt: Date;
    email: string;
    nickname: string;
    profileImage: string;
    myPosts: Types.ObjectId[];
    bookMarkedPosts: Types.ObjectId[];
  };
}

export const _UserSchema = SchemaFactory.createForClass(User);

_UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    createdAt: this.createdAt,
    email: this.email,
    nickname: this.nickname,
    profileImage: this.profileImage,
    myPosts: this.myPosts,
    bookMarkedPosts: this.bookMarkedPosts,
  };
});
// _UserSchema.virtual('posts', {
//   ref: 'posts',
//   localField: '_id',
//   foreignField: 'authorId',
// });
// _UserSchema.set('toObject', { virtuals: true });
// _UserSchema.set('toJSON', { virtuals: true });
export const UserSchema = _UserSchema;
//이건 가상필드인데, db에 저장되지 않는다. 가입을 할 때 createdUser를 리턴하면 비밀번호도 보여버리니까,
//가상필드를 만들어서 보여줘도 상관없는 데이터만 보내는거.
//스키마에 추가해서 사용한다.

//데이터를 리턴 할 때 myPosts에 담긴 id들을 post 스키마와 조인해서 데이터를 가져오는 방법.
