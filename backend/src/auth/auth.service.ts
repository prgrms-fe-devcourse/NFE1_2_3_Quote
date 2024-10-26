import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
    //모듈에서 JwtModule만든거 사용
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
}
