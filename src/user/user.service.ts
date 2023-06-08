import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/schemas/createUser.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async newUser(createUser: CreateUserDto): Promise<User> {
    createUser.roles = createUser.roles ?? ['user'];
    const checkUsers = await this.userModel
      .findOne({
        $or: [{ userName: createUser.userName }, { email: createUser.email }],
      })
      .exec();
      console.log("checkUsers ==>",checkUsers);
      
    if (checkUsers) {
      if (createUser.email === checkUsers.email) {
        throw new HttpException(
          `${createUser.email} is Already exits`,
          HttpStatus.NOT_ACCEPTABLE,
        );
      } else {
        throw new HttpException(
          `${createUser.userName} is Already exits`,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } else {
      try {
        const user = await this.userModel.create(createUser);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        if (user) {
          return await user.save();
        }
      } catch (error) {
        throw new HttpException('Bad Request, Please enter information', HttpStatus.BAD_REQUEST);
      }
    }
  }
  async getAllUser(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      console.log('users');
      return users;
    } catch (error) {
      console.log('error');
      throw new HttpException('User Not Founded', HttpStatus.NOT_FOUND);
    }
  }

  async findUser(userName: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ userName });
    return user;
  }
}
