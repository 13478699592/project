import { Controller,Body, Get,Req,Post,Request,Response  } from '@nestjs/common';
import * as _ from 'lodash';
import { UserListEntity } from '../entities/system/userList.entity';
import { DmHttpService } from './dm_http.service';

@Controller()
export class DmHttpController {
  constructor(
    private readonly dmhttpService: DmHttpService
  ) {}

  @Post("form/userlist")
  async create(
    @Body("formdata") formdata: UserListEntity
  ) {
    return this.dmhttpService.userlist(formdata);
  }

  @Post("form/userlist")
  async getUserList(
    @Body("formdata") formdata: UserListEntity
  ) {
    return this.dmhttpService.userlist(formdata);
  }
}
