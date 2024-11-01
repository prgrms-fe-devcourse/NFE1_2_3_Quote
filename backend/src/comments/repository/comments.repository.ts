import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../schemas/comments.schema';
import { Post } from 'src/posts/schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async getCommentsByPostId(id: string) {
    const targetPost = await this.postModel.findById(id);
    const comments = await this.commentsModel
      .find({ postId: targetPost.id })
      .populate('authorId', 'nickname profileImage')
      .exec();
    return comments;
  }
  async createComment(user: User, id: string, comments: CommentsCreateDto) {
    const post = await this.postModel.findById(id);
    const { contents } = comments;
    const newComment = new this.commentsModel({
      authorId: user._id,
      contents,
      postId: post.id,
    });

    await newComment.save();

    // 새로운 댓글의 ID를 게시물의 댓글에 추가
    post.comments.push(newComment.id);
    await post.save();

    return newComment;
  }
  async updateComment(comments: CommentsCreateDto, user: User, id: string) {
    const comment = await this.commentsModel.findById(id);
    if (comment.authorId.toString() !== user._id.toString()) {
      throw new Error('This is not your comment');
    }
    await this.commentsModel.findByIdAndUpdate(id, comments);
    return await this.commentsModel.findById(id);
  }
  async deleteComment(id: string, user: User) {
    const comment = await this.commentsModel.findById(id);
    const post = await this.postModel.findById(comment.postId);
    if (comment.authorId.toString() !== user._id.toString()) {
      throw new Error('This is not your comment');
    }
    post.comments = post.comments.filter(
      (commentId) => commentId.toString() !== id,
    );
    await post.save();
    await this.commentsModel.findByIdAndDelete(id);
  }
}
