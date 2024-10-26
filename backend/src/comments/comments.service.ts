import { User } from 'src/users/schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { CommentsRepository } from './repository/comments.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from './schemas/comments.schema';
import { Model } from 'mongoose';
import e from 'express';
import { PostsRepository } from 'src/posts/repository/posts.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    private readonly postsRepository: PostsRepository,
  ) {}

  async getAllComments() {
    try {
      const allComments = await this.commentsModel.find();
      return allComments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(user: User, id: string, comments: CommentsCreateDto) {
    try {
      const post = await this.postsRepository.getPostById(id);

      const { contents } = comments;

      const newComment = new this.commentsModel({
        author: user._id,
        contents,
        info: post.id,
      });

      await newComment.save();
      return newComment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //   async createComment(id: string, comments: CommentsCreateDto) {
  //     try {
  //       const targetPost = await this.commentsModel.findById(id);
  //     } catch (error) {}
  //   }

  async plusLike(id: string) {
    try {
      const targetComment = await this.commentsModel.findById(id);
      // targetComment.likes += 1;
      await targetComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
