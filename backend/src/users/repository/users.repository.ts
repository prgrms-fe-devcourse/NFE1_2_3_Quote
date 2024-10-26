import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRequestDto } from '../dto/users.request.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getAllUser() {
    return await this.userModel.find();
  }
  async findByIdAndUpdateImg(id: string, fileName: string) {
    const user = await this.userModel.findById(id);
    if (fileName !== '') {
      user.profileImage = fileName;
    }
    const newUser = await user.save();
    return newUser.readOnlyData;
  }
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    return result ? true : false;
  }
  async existsByNickname(nickname: string): Promise<boolean> {
    const result = await this.userModel.exists({ nickname });
    return result ? true : false;
  }
  async createUser(user: UserRequestDto): Promise<User> {
    const createdUser = new this.userModel(user);
    createdUser.save();
    return createdUser;
  }

  //myPosts는 내가 쓴 글을 post의 id와 연결해서 가져오는 것.
  //bookMarkedPosts는 내 id와 post의 bookMarked와 연결해서 가져오는 것.
  async findById(userId: string): Promise<User | null> {
    const user = await this.userModel
      .findById(userId)
      .populate(['myPosts', 'bookMarkedPosts'])
      .exec();

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findByIdAndUpdateNickname(userId: string, nickname: string) {
    const user = await this.userModel.findById(userId);
    user.nickname = nickname;
    const newUser = await user.save();
    return newUser.readOnlyData;
  }
  async findUserByIdWithoutPassword(
    userId: string | Types.ObjectId,
    //string인 경우에는...아니 이거 어디서 썻었지
  ): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
  async deleteUserById(userId: string) {
    return await this.userModel.findByIdAndDelete(userId);
  }
}
