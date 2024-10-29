import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KaKaoAuthGuard } from './oauth/kakao/kakao.guard';
import { AuthService } from './auth.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao/callback')
  @UseGuards(KaKaoAuthGuard)
  async kakaoSignUpOrSignIn(@CurrentUser() user) {
    return await this.authService.kakaoSignUpOrSignIn(user);
  }

  // @Get('kakao/signin/callback')
  // @UseGuards(KaKaoAuthGuard)
  // async kakaoSignIn(@Req() req, @Query('code') code: string) {
  //   return this.authService.kakaoLogin(req.user);
  // }
}
