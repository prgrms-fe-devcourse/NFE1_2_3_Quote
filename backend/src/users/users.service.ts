import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserRequestDto } from './dto/users.request.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/users.repository';
import { User } from './schemas/user.schema';
import { AwsService } from 'src/posts/aws.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly awsService: AwsService,
  ) {}
  async getAllUser() {
    const allUser = await this.userRepository.getAllUser();
    const readOnlyData = allUser.map((user) => user.readOnlyData);
    return readOnlyData;
  }

  async signUp(body: UserRequestDto) {
    const { email, password, nickname } = body;
    const isUserEmailExist = await this.userRepository.existsByEmail(email);
    const isUserNickNameExist =
      await this.userRepository.existsByNickname(nickname);
    if (isUserEmailExist && isUserNickNameExist) {
      throw new BadRequestException({
        nickname: 'nickname already taken',
        email: 'email already in use',
        error: 'Bad Request',
        statusCode: 400,
      });
    } else if (isUserEmailExist) {
      throw new BadRequestException('email already in use');
    } else if (isUserNickNameExist) {
      throw new BadRequestException('nickname already taken');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createdUser = await this.userRepository.createUser({
      ...body,
      password: hashedPassword,
    });
    return createdUser.readOnlyData;
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException('user does not exist', 404);
    }
    return user.readOnlyData;
  }

  async updateUserById(user: User, body: { nickname: string }) {
    const { nickname } = body;
    const newUser = await this.userRepository.findByIdAndUpdateNickname(
      user.id,
      nickname,
    );
    return newUser;
  }

  async uploadImage(user: User, image: Express.Multer.File) {
    //이미지가 있을 경우에만 이미지 업로드를 하고,fileName을 업데이트한다.
    //이미지가 없을 경우에는 fileName을 건들지 않는다.
    let imageKey = '';
    if (image != undefined) {
      const saveImage = await this.awsService.uploadFileToS3('users', image);
      const fileName = this.awsService.getAwsS3FileUrl(saveImage.key);
      imageKey = fileName;
    }
    const newUser = await this.userRepository.findByIdAndUpdateImg(
      user.id,
      imageKey,
    );
    return newUser;
  }

  async deleteUserById(user: User) {
    const deletedUser = await this.userRepository.deleteUserById(user.id);
    if (!deletedUser) {
      throw new HttpException('user does not exist', 404);
    }
  }
}
