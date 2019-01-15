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
}
