import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { KakaoUserInfo } from './oauth/kakao/kakao.userInfo.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(data: LoginRequestDto) {
    const { email, password } = data;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('This email is not registered');
    }
    //여긴 salt 없는데 어케 비교하는거지?
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('You entered your password incorrectly');
    }
    //jwt를 반환해주는 부분.
    //nest/jwt가 제공하는 기능을 사용해야 하므로 Module에서  JwtModule 주입받아 사용.
    const payload = { email: user.email, sub: user.id };
    return {
      bearerToken: this.jwtService.sign(payload),
    };
  }
  async kakaoLogin() {
    const CLIENT_ID = process.env.CLIENT_ID;
    return `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=https://quote.n-e.kr/kakao/callback&response_type=code`;
  }
  async kakaoSignUpOrSignIn(user: KakaoUserInfo) {
    const { kakaoId, nickname, profileImage } = user;
    const existUser = await this.userRepository.findUserByEmail(
      kakaoId.toString(),
    );
    if (!existUser) {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        kakaoId.toString(),
        saltOrRounds,
      );
      const newUser = {
        email: kakaoId.toString(),
        nickname: nickname,
        password: hashedPassword,
        profileImage: profileImage,
      };
      const createdUser = await this.userRepository.createUser(newUser);

      return createdUser.readOnlyData;
    }
    return await this.signIn({
      email: kakaoId.toString(),
      password: kakaoId.toString(),
    });
  }
}
