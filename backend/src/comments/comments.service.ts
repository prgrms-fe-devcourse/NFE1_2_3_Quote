import { User } from 'src/users/schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { CommentsRepository } from './repository/comments.repository';
import { PostsRepository } from 'src/posts/repository/posts.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getCommentsByPostId(id: string) {
    try {
      const comments = await this.commentsRepository.getCommentsByPostId(id);
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(user: User, id: string, comments: CommentsCreateDto) {
    try {
      const newComments = await this.commentsRepository.createComment(
        user,
        id,
        comments,
      );

      return newComments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateComment(comments: CommentsCreateDto, user: User, id: string) {
    try {
      const updatedComment = await this.commentsRepository.updateComment(
        comments,
        user,
        id,
      );
      return updatedComment;
    } catch (error) {
      if (error.message === 'This is not your comment') {
        throw new BadRequestException('This is not your comment');
      }
      throw new BadRequestException(error.message);
    }
  }

  async deleteComment(user: User, id: string) {
    try {
      const deletedComment = await this.commentsRepository.deleteComment(
        id,
        user,
      );
      return deletedComment;
    } catch (error) {
      if (error.message === 'This is not your comment') {
        throw new BadRequestException('This is not your comment');
      }
      throw new BadRequestException(error.message);
    }
  }

  //   async createComment(id: string, comments: CommentsCreateDto) {
  //     try {
  //       const targetPost = await this.commentsModel.findById(id);
  //     } catch (error) {}
  //   }
}
