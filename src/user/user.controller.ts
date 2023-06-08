import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/schemas/createUser.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async registerUser(@Body() userDto: CreateUserDto) {
    console.log(process.env.ROLES_KEY);
    console.log(process.env.JWT_KEY);
    const user = await this.userService.newUser(userDto);
    return user;
  }

  @Get('/getAllUsers')
  async getAllUsers() {
    const user = await this.userService.getAllUser();
    return user;
  }
}
