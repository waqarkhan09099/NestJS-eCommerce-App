import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Role } from '../enums/Roles.enum';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalAuthGuard } from '../guards/local.guard';
import { RolesAuthGuard } from '../guards/roles.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    const user = await this.userService.newUser(userDto);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    console.log(req.body);
    console.log(req.user);

    return this.authService.login(req.body);
  }

  // @UseGuards(JwtAuthGuard, RolesAuthGuard)
  // @Roles(Role.User)
  // @Get('/user')
  // getProfile(@Req() req: Request) {
  //   return;
  // }

  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @Roles(Role.User)
  @Get('/user')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Req() req: Request) {
    return req.body;
  }
}
