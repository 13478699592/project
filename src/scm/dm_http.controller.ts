import { Controller,Body, Get,Req,Post,Request,Response, UseInterceptors, FileInterceptor, UploadedFile  } from '@nestjs/common';
import * as _ from 'lodash';
import { UserListEntity } from '../entities/system/userList.entity';
import { DmHttpService } from './dm_http.service';
import { createWriteStream } from 'fs';
import { join } from 'path';

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
  @UseInterceptors(FileInterceptor('file'))
  async userlist_import(
    @UploadedFile() file, @Body() body
  ) {
    const writeImage = createWriteStream(join(__dirname, '..', 'upload', `${body.name}-${Date.now()}-${file.originalname}`))
    writeImage.write(file.buffer)
    return this.dmhttpService.userlist_import(writeImage);
  }

  // @Post("form/userlist/import")
  // @UseInterceptors(FileInterceptor("file"))
  // public uploadFile(@UploadedFile() file, @Body("token") token) {
  //  console.log(file);
  // }
}
