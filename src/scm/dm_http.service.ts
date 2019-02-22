import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserListEntity, FileEntity } from '../entities';
import { HTTP_STATUS_CODE_ENUM } from '../core/shared/enums';
import { createResult } from '../core/utils';
import { IFile } from 'src/core/shared/interfaces';
import * as xlsx from 'xlsx';
import * as _ from 'lodash';

@Injectable()
export class DmHttpService {
  constructor(
    @InjectRepository(UserListEntity)
    private readonly repository: Repository<UserListEntity>,
    @InjectRepository(FileEntity)
    private readonly Filerepository: Repository<FileEntity>,
  ) {}

  async userlist(formdata) {
    const Data = await this.repository.findOne({
      where: { name: formdata.name},
    });
    let userListEntityarr = [];
    userListEntityarr.push(formdata);
    if(Data){
      return createResult({status:"default",code:HTTP_STATUS_CODE_ENUM.REPEAT_ITEM});
    }else{
      const ItemEntities = userListEntityarr.map((param) => {
        const newEntity = new UserListEntity();
        newEntity.name = param.name;
        newEntity.age = param.age;
        newEntity.address = param.address;
        return newEntity;
      });
      const createdUser = await this.repository.save(
        ItemEntities,
      );
      return createResult({status:"success",code:HTTP_STATUS_CODE_ENUM.OK});
    }
  }
  
  async getUserList(param){
    const skip = (param.currentPage-1)*param.pageSize;
    const totalPage = await this.repository.count();
    const allUsers = await this.repository.find({order:{age:'ASC'},skip:skip,take:param.pageSize,});
    if(allUsers.length==param.pageSize){
      const beginPage = param.currentPage*param.pageSize-(param.pageSize-1);
      const endPage = param.currentPage*param.pageSize;
      return createResult({data:allUsers,totalPage:totalPage,beginPage:beginPage,endPage:endPage,code:HTTP_STATUS_CODE_ENUM.OK});
    }else if(allUsers.length!=param.pageSize&&allUsers.length>0){
      const beginPage = param.currentPage*param.pageSize-(param.pageSize-1);
      const endPage =param.currentPage*param.pageSize-(param.pageSize-allUsers.length);
      return createResult({data:allUsers,totalPage:totalPage,beginPage:beginPage,endPage:endPage,code:HTTP_STATUS_CODE_ENUM.OK});
    }else{
      return createResult({data:[],code:HTTP_STATUS_CODE_ENUM.NO_DATA});
    }
  }

  async deleteUser(formdata){
    const User = await this.repository.findOne({
      where:{id:formdata.id}
    })
    console.log(User);
    if(User){
        await this.repository.delete(formdata.id);
        return createResult({code:HTTP_STATUS_CODE_ENUM.OK});
    }else{
      return;
    }
  }

  async editUser(formdata){
    const User = await this.repository.findOne({
      where:{id:formdata.id}
    })
    console.log(User);
    if(User){
        User.name = formdata.name;
        User.address = formdata.address;
        User.age = formdata.age;
        await this.repository.save(User);
        return createResult({code:HTTP_STATUS_CODE_ENUM.OK});
    }else{
      return;
    }
  }

  async userlist_import(file: IFile){
    const files = [];
    console.log(file);
    const fileName = file.originalname;
    const workbook: xlsx.WorkBook = xlsx.read(file.buffer);
    const sheet: xlsx.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    const datas: any[] = xlsx.utils.sheet_to_json(sheet);
    console.log(datas);
    _.forEach(datas, (data,index) => {
      const file: FileEntity = new FileEntity();
      file.age = data.age;
      file.name = data.name;
      file.address = data.address;
      file.uploadTime = new Date();
      file.fileName = fileName;
      files.push(file);
    });
    console.log(files);
    await this.Filerepository.save(files);
    return createResult({code:HTTP_STATUS_CODE_ENUM.OK});
  }

  async excelUserList(){
    const Data = await this.Filerepository.find();
    if(Data.length>0){
      return createResult(Data);
  }else{
    return;
  }
  }
}
