import { Controller,Body, Get,Req,Post,Request,Response  } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities';
import * as _ from 'lodash';

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Post("login")
  async create(
    @Body("users") users: UserEntity
  ) {
    return this.appService.login(users);
  }

  @Post("register")
  async createRegister(@Body("user") userEntity: UserEntity) {
    return this.appService.register(userEntity);
  }

  @Get()
  getHello() {
    return 'Hello World!';
  }
}
