import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KaKaoAuthGuard } from './oauth/kakao/kakao.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao/callback')
  @UseGuards(KaKaoAuthGuard)
  async kakaoSignUpOrSignIn(@Req() req) {
    console.log(await this.authService.kakaoSignUpOrSignIn(req.user));
  }

  // @Get('kakao/signin/callback')
  // @UseGuards(KaKaoAuthGuard)
  // async kakaoSignIn(@Req() req, @Query('code') code: string) {
  //   return this.authService.kakaoLogin(req.user);
  // }
}
