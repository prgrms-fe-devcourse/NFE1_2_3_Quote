import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../schemas/comments.schema';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
  ) {}
  async getAllComments() {}
}
