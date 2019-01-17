import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserListEntity } from '../entities';
import { HTTP_STATUS_CODE_ENUM } from '../core/shared/enums';
import { createResult } from '../core/utils';

@Injectable()
export class DmHttpService {
  constructor(
    @InjectRepository(UserListEntity)
    private readonly repository: Repository<UserListEntity>
  ) {}

  async userlist(formdata) {
    const Data = await this.repository.find({
      where: { name: formdata.name},
    });
    let userListEntityarr = [];
    userListEntityarr.push(formdata);
    if(Data.length > 0){
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
    const User = await this.repository.find({
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
}
