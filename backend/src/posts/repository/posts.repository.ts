import { Injectable } from '@nestjs/common';

import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { PostSaveDao } from '../dto/post.save.dao';
import { Comments } from 'src/comments/schemas/comments.schema';
import { User } from 'src/users/schemas/user.schema';
import { PostRequestDto } from '../dto/post.request.dto';
import { PostPreviewResponseDto } from '../dto/post.response.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    @InjectModel(User.name) private usersModel: Model<User>,
  ) {}
  //모든 포스트 가져오기
  async getAllPosts(): Promise<PostPreviewResponseDto[]> {
    const result = await this.postModel
      .find(
        {},
        {
          id: 1,
          category: 1,
          title: 1,
          quote: 1,
          authorId: 1,
          createdAt: 1,
          updatedAt: 1,
          bookMarked: 1,
        },
      )
      .populate('authorId', 'nickname')
      .exec();
    return result;
  }

  //id로 포스트 가져오기
  async getPostById(postId: string | Types.ObjectId) {
    return await this.postModel
      .findById(postId)
      .populate('authorId', 'nickname profileImage')
      .exec();
  }

  //특정 카테고리 포스트 가져오기
  async getPostByCategory(category: string): Promise<PostPreviewResponseDto[]> {
    return await this.postModel
      .find(
        { category },
        {
          id: 1,
          category: 1,
          title: 1,
          quote: 1,
          authorId: 1,
          createdAt: 1,
          updatedAt: 1,
          bookMarked: 1,
        },
      )
      .populate('authorId', 'nickname')
      .exec();
  }

  async searchPosts(title: string, category: string) {
    const query: any = {
      title: { $regex: title, $options: 'i' }, // 대소문자 구분 없이 제목 검색
    };

    // category가 제공되었을 때만 추가
    if (category != '') {
      query.category = category; // 정확한 카테고리 일치
    }

    return await this.postModel
      .find(query, {
        id: 1,
        category: 1,
        title: 1,
        quote: 1,
        authorId: 1,
        createdAt: 1,
        updatedAt: 1,
        bookMarked: 1,
      })
      .populate('authorId', 'nickname')
      .exec();
  }

  //포스트 생성하기
  async createPost(post: PostSaveDao): Promise<Post> {
    const createdPost = new this.postModel({
      ...post,
      postImage: post.postImage ? post.postImage : '',
    });
    createdPost.save();
    await this.usersModel.findByIdAndUpdate(post.authorId, {
      $push: { myPosts: createdPost._id }, // 새로 생성된 게시글 ID를 사용자 배열에 추가
    });
    return createdPost;
  }

  //포스트 수정하기
  async updatePost(
    post: Omit<PostRequestDto, 'category' | 'postImage'>,
    id: string,
    fileName: string,
  ) {
    const existPost = await this.postModel.findById(id);
    existPost.title = post.title;
    existPost.content = post.content;
    existPost.quote = post.quote;
    existPost.postImage = fileName !== '' ? fileName : existPost.postImage;
    const updatedPost = await existPost.save();
    return updatedPost;
  }

  //포스트 삭제하기
  async deletePostById(user: User, postId: string) {
    //포스트 검색
    const post = await this.postModel.findById(postId);
    // 좋아요 누른 사용자 ID로 사용자 검색
    const likedUsers = await this.usersModel.find({
      _id: { $in: post.bookMarked.map((bookMark) => bookMark.userId) },
    });
    // 각 사용자의 likedPosts 배열에서 해당 포스트 ID 제거
    for (const likedUser of likedUsers) {
      likedUser.bookMarkedPosts = likedUser.bookMarkedPosts.filter(
        (bookMarkedPost) => bookMarkedPost.toString() !== postId,
      );
      await likedUser.save();
    }
    // 포스트 작성자의 myPosts 배열에서 해당 포스트 삭제
    const author = await this.usersModel.findById(user.id);
    author.myPosts = author.myPosts.filter(
      (myPost) => myPost.toString() !== postId,
    );
    await author.save();

    //포스트 삭제
    await this.postModel.findByIdAndDelete(postId);
  }

  //게시글에 좋아요 추가
  async likePost(postId: string, userId: string) {
    //포스트 정보 가져오기
    const post = await this.postModel.findById(postId);
    //좋아요 눌렀는지 확인하기
    const existUser = post.bookMarked.find(
      (bookMark) => bookMark.userId.toString() === userId,
    );
    const user = await this.usersModel.findById(userId);
    //눌렀으면 취소하기
    if (existUser) {
      post.bookMarked = post.bookMarked.filter(
        (bookMark) => bookMark.userId.toString() !== userId,
      );
      //유저의 좋아요한 게시글 배열에서 해당 게시글 삭제
      user.bookMarkedPosts = user.bookMarkedPosts.filter(
        (bookMarkedPost) => bookMarkedPost.toString() !== postId,
      );

      //안눌렀으면 추가하기
    } else {
      post.bookMarked.push({ userId: new Types.ObjectId(userId) });
      //유저의 좋아요한 게시글 배열에 해당 게시글 추가
      user.bookMarkedPosts.push(new Types.ObjectId(postId));
    }
    //포스트 저장하기
    await post.save();
    await user.save();
    return post;
  }
}
