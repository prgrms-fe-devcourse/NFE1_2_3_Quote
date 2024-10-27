import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UserChangeNicknameDto, UserRequestDto } from './dto/users.request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyUserDto } from './dto/user.readOnly.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './schemas/user.schema';
import { memoryStorage } from 'multer';
import { UserLoginResponseDto } from './dto/user.response.dto';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({ status: 200, description: '성공', type: ReadOnlyUserDto })
  @ApiOperation({ summary: '현재 로그인한 유저 정보' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@CurrentUser() user: User): ReadOnlyUserDto {
    return user.readOnlyData;
  }

  @ApiResponse({ status: 200, description: '성공' })
  @ApiOperation({ summary: '닉네임 중복 검사' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get('check/nickname/:nickname')
  async nickNameValidation(
    @CurrentUser() user: User,
    @Param('nickname') nickname: string,
  ) {
    if (!nickname) {
      throw new BadRequestException('nickname is empty');
    }
    return await this.usersService.nickNameValidation(user, nickname);
  }

  @ApiResponse({ status: 200, description: '성공', type: ReadOnlyUserDto })
  @ApiOperation({ summary: 'id로 유저정보 가져오기' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReadOnlyUserDto> {
    return await this.usersService.getUserById(id);
  }

  @ApiResponse({ status: 201, description: '성공', type: ReadOnlyUserDto })
  @ApiOperation({ summary: '유저 닉네임 변경' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUserById(
    @CurrentUser() user: User,
    @Body() body: UserChangeNicknameDto,
  ): Promise<ReadOnlyUserDto> {
    return await this.usersService.updateUserById(user, body);
  }

  @ApiResponse({
    status: 201,
    description: '성공',
    type: ReadOnlyUserDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body: UserRequestDto): Promise<ReadOnlyUserDto> {
    return await this.usersService.signUp(body);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserLoginResponseDto,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  logIn(@Body() data: LoginRequestDto): Promise<UserLoginResponseDto> {
    return this.authService.signIn(data);
  }

  //이미지가 없다면 여기서 커트를해야지
  @ApiResponse({ status: 201, description: '성공', type: ReadOnlyUserDto })
  @ApiOperation({ summary: '프로필  이미지 업로드' })
  @ApiBearerAuth('bearer')
  @Patch('upload')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  //users라는 폴더에 이미지 저장
  @UseGuards(JwtAuthGuard)
  //유저정보 가져오기
  uploadUsers(
    @UploadedFile() image: Express.Multer.File | undefined,
    @CurrentUser() user: User,
  ): Promise<ReadOnlyUserDto> {
    if (image === undefined) {
      throw new BadRequestException(
        'Image upload failed. No image file provided.',
      );
    }
    //로그인한 유저 정보와 이미지를 전달.
    return this.usersService.uploadImage(user, image);
  }

  @ApiResponse({ status: 204, description: '성공' })
  @ApiOperation({ summary: '로그인한 유저 계정 삭제' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUserById(@CurrentUser() user: User) {
    this.usersService.deleteUserById(user);
  }
}
