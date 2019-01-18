import { Controller,Body, Get,Req,Post,Request,Response, UseInterceptors, FileInterceptor, UploadedFile  } from '@nestjs/common';
import * as _ from 'lodash';
import { UserListEntity } from '../entities/system/userList.entity';
import { DmHttpService } from './dm_http.service';
import { createWriteStream } from 'fs';

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

  @Post("form/edituser")
  async editUser(
    @Body("formdata") formdata: UserListEntity
  ) {
    return this.dmhttpService.editUser(formdata);
  }

  @Post("form/userlist/import")
  async userlist_import(
    @Body("formdata") formdata
  ) {
    return this.dmhttpService.userlist_import(formdata);
  }

  // @Post("form/userlist/import")
  // @UseInterceptors(FileInterceptor("file"))
  // public uploadFile(@UploadedFile() file, @Body("token") token) {
  //  console.log(file);
  // }
}
