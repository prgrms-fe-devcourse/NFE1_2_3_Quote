import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

export class KakaoUserInfo {
  kakaoId: number;
  nickname: string;
  profileImage: string;
}
