import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { UsersRepository } from 'src/users/repository/users.repository';
import { User } from 'src/users/schemas/user.schema';
import { Error } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //이건 jwt를 복호화하는 모듈
  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //요청 헤더에서 토큰 추출
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload): Promise<User | Error> {
    const user = await this.userRepository.findUserByIdWithoutPassword(
      payload.sub,
    );
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }
  }
}
