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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/schemas/user.schema';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '댓글 생성하기' })
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Param('id') id: string,
    @Body() comments: CommentsCreateDto,
    @CurrentUser() user: User,
  ) {
    return await this.commentsService.createComment(user, id, comments);
  }

  @ApiOperation({ summary: '좋아요 누르기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return await this.commentsService.plusLike(id);
  }
  //   @ApiOperation({ summary: '댓글 수정하기' })
  //   @Put('id')
  //   async updateComment() {
  //     return await this.commentsService.updateComment();
  //   }

  //   @ApiOperation({ summary: '댓글 삭제하기' })
  //   @Delete('id')
  //   async deleteComment() {
  //     return await this.commentsService.deleteComment();
  //   }
}
