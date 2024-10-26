import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PostsRepository } from './repository/posts.repository';
import { MulterModule } from '@nestjs/platform-express';
import { Comments, CommentsSchema } from 'src/comments/schemas/comments.schema';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
      //dest: './upload'는 프로젝트 루트에 upload라는 폴더를 만들어서 파일을 저장한다는 뜻입니다.
    }),
    ConfigModule,
    AuthModule,
    forwardRef(() => UsersModule),
    // CommentsModule,

    // forwardRef(() => CommentsModule),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, AwsService],
  exports: [PostsService, PostsRepository, AwsService],
})
export class PostsModule {}
