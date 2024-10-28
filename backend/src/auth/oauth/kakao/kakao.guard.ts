import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class KaKaoAuthGuard extends AuthGuard('kakao') {} //strategy를 자동으로 실행시켜줌.
