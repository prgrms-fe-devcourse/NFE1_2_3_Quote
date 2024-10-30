import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsRepository } from './repository/posts.repository';
import { User } from 'src/users/schemas/user.schema';
import { PostRequestDto } from './dto/post.request.dto';
import { AwsService } from './aws.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly awsService: AwsService,
  ) {}

  async getAllPosts() {
    const allPosts = await this.postRepository.getAllPosts();
    return allPosts;
  }

  async getPostById(postId: string) {
    const post = await this.postRepository.getPostById(postId);
    return post;
  }

  async getPostByCategory(category: string) {
    const posts = await this.postRepository.getPostByCategory(category);
    return posts;
  }

  async searchPosts(title: string, category: string) {
    const posts = await this.postRepository.searchPosts(title, category);
    return posts;
  }

  async createPost(
    data: PostRequestDto,
    user: User,
    image: Express.Multer.File | undefined,
  ) {
    let imageKey = '';
    if (image != undefined) {
      const saveImage = await this.awsService.uploadFileToS3('posts', image);
      const fileName = this.awsService.getAwsS3FileUrl(saveImage.key);
      imageKey = fileName;
    }
    const newPost = {
      ...data,
      postImage: imageKey,
      authorId: user.id,
    };
    const post = await this.postRepository.createPost(newPost);
    return post;
  }

  async updatePost(
    id: string,
    data: PostRequestDto,
    user: User,
    image: Express.Multer.File | undefined,
  ) {
    //만약 이미지가 없거나,내 aws버킷에 있던 이미지라면 이미지 업로드를 하지 않고,fileName도 건들지 않는다.
    //하지만 이미지가 있고, 내 aws버킷에 없는 이미지라면 이미지 업로드를 하고,fileName을 업데이트한다.
    let imageKey = '';

    if (image != undefined) {
      //이미지가 들어있으면 이미지 업로드=> 차후 현재 이름 같은 이미지 있는지 검증하는 로직 필요
      const saveImage = await this.awsService.uploadFileToS3('posts', image);
      const fileName = this.awsService.getAwsS3FileUrl(saveImage.key);
      imageKey = fileName;

      const newPost = {
        title: data.title,
        content: data.content,
        quote: data.quote,
      };
      const post = await this.postRepository.updatePost(newPost, id, imageKey);
      return post;
    } else {
      const newPost = {
        title: data.title,
        content: data.content,
        quote: data.quote,
      };
      const post = await this.postRepository.updatePost(newPost, id, '');
      return post;
    }
  }

  async deletePostById(user: User, postId: string) {
    //postId로 포스트 찾기 (populate없이)
    const post = await this.postRepository.getPostByIdNoPopulate(postId);

    //포스트가 있는지 확인
    if (!post) {
      throw new BadRequestException('해당 게시글이 존재하지 않습니다.');
    }
    //포스트 작성자와 현재 유저가 같은지 확인
    if (post.authorId.toString() !== user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.postRepository.deletePostById(user, postId);
  }

  async likePost(postId: string, user: string) {
    return await this.postRepository.likePost(postId, user);
  }
}
//유저 이미지도 보여줘야 할텐데...
//유저 id, 유저 닉네임, 유저 이미지를 묶어서 관리해야...
