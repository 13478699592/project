import { Controller,Body, Get,Req,Post,Request,Response  } from '@nestjs/common';
import * as _ from 'lodash';
import { UserListEntity } from '../entities/system/userList.entity';
import { DmHttpService } from './dm_http.service';

@Controller()
export class DmHttpController {
  constructor(
    private readonly dmhttpService: DmHttpService
  ) {}

  @Post("form/adduser")
  async create(
    @Body("formdata") formPara: UserListEntity
  ) {
    return this.dmhttpService.userlist(formPara);
  }

  @Post("form/userlist")
  async getUserList(
    @Body("formdata") formPara: UserListEntity
  ) {
    return this.dmhttpService.getUserList(formPara);
  }

  @Post("form/delete")
  async deleteUser(
    @Body("formdata") formdata: UserListEntity
  ) {
    return this.dmhttpService.deleteUser(formdata);
  }
}
