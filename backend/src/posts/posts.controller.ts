import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { PostRequestDto } from './dto/post.request.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  PostPreviewResponseDto,
  PostResponseDto,
} from './dto/post.response.dto';

@Controller('posts')
@UseInterceptors(SuccessInterceptor) //이건 글로벌로 설정할 수 없나?
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: [PostPreviewResponseDto],
  })
  @ApiOperation({ summary: '모든 포스트 가져오기' })
  @Get('all')
  getAllPosts(): Promise<PostPreviewResponseDto[]> {
    return this.postsService.getAllPosts();
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: [PostPreviewResponseDto],
  })
  @ApiOperation({ summary: '포스트 검색 ' })
  @Get('search')
  searchPosts(
    @Query('title') title: string,
    @Query('category') category?: string,
  ): Promise<PostPreviewResponseDto[]> | [] {
    if (!title) {
      return []; // 빈 배열 반환
    }
    return this.postsService.searchPosts(title, category);
  }

  @ApiResponse({ status: 200, description: '성공', type: PostResponseDto })
  @ApiOperation({ summary: 'id로 포스트 가져오기' }) //이것만 모든 post가져오기
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostResponseDto> {
    return this.postsService.getPostById(id);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: [PostPreviewResponseDto],
  })
  @ApiOperation({ summary: '특정 카테고리 포스트 가져오기' })
  @Get('quote/:category')
  getPostByCategory(
    @Param('category') category: string,
  ): Promise<PostPreviewResponseDto[]> {
    return this.postsService.getPostByCategory(category);
  }

  @ApiResponse({ status: 201, description: '성공', type: PostResponseDto })
  @ApiOperation({ summary: '포스트 생성하기' })
  @ApiBearerAuth('bearer')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() data: PostRequestDto,
    @CurrentUser() user: User,
    @UploadedFile() image: Express.Multer.File | undefined,
  ): Promise<PostResponseDto> {
    return this.postsService.createPost(data, user, image);
  }

  @ApiResponse({ status: 201, description: '성공', type: PostResponseDto })
  @ApiOperation({ summary: '포스트 수정하기' })
  @ApiBearerAuth('bearer')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Body() data: PostRequestDto,
    @CurrentUser() user: User,
    @UploadedFile() image: Express.Multer.File | undefined,
  ) {
    return this.postsService.updatePost(id, data, user, image);
  }

  @ApiResponse({ status: 204, description: '성공' })
  @ApiOperation({ summary: 'id로 게시글 삭제' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUserById(@CurrentUser() user: User, @Param('id') id: string): void {
    this.postsService.deletePostById(user, id);
  }

  // 게시글에 좋아요 추가
  @ApiResponse({ status: 201, description: '성공', type: PostResponseDto })
  @ApiOperation({ summary: '게시글 좋아요' })
  @ApiBearerAuth('bearer')
  @Post(':postId/like')
  @UseGuards(JwtAuthGuard)
  async likePost(
    @Param('postId') postId: string,
    @CurrentUser() user: User,
  ): Promise<PostResponseDto> {
    return this.postsService.likePost(postId, user.id);
  }
}
