import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Comments } from './schemas/comments.schema';
import { CommentsResponseDto } from './dto/comments.response.dto';

@Controller('comments')
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: [CommentsResponseDto],
  })
  @ApiOperation({ summary: '특정 포스트의 댓글 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCommentsByPostId(@Param('id') id: string) {
    return await this.commentsService.getCommentsByPostId(id);
  }

  @ApiResponse({
    status: 201,
    description: '성공',
    type: [CommentsResponseDto],
  })
  @ApiOperation({ summary: '댓글 생성하기' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() comments: CommentsCreateDto,
    @CurrentUser() user: User,
  ) {
    return await this.commentsService.createComment(user, id, comments);
  }

  @ApiResponse({
    status: 201,
    description: '성공',
    type: [CommentsResponseDto],
  })
  @ApiOperation({ summary: '댓글 수정하기' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateComment(
    @Body() comments: CommentsCreateDto,
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.commentsService.updateComment(comments, user, id);
  }

  @ApiResponse({
    status: 204,
    description: '성공',
  })
  @ApiOperation({ summary: '댓글 삭제하기' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@CurrentUser() user: User, @Param('id') id: string) {
    return await this.commentsService.deleteComment(user, id);
  }
}
