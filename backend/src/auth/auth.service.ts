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
      console.log(newUser);
      return await this.userRepository.createUser(newUser);
    }

    return await this.signIn({
      email: kakaoId.toString(),
      password: kakaoId.toString(),
    });
  }
}
//code로 토큰 발급 요청하고
//해당 토큰으로 유저 정보 요청하고
//해당 유저가 db에 있는지 확인하고
//없으면 db에 저장하고
//있으면 jwt 토큰 발급
//payload에 email대신 kakaoId를 넣어줄까.

//탈퇴하면 다 날리기. 포스트, 북마크
