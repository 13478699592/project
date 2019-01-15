import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { HTTP_STATUS_CODE_ENUM } from './core/shared/enums';
import { createResult } from './core/utils';
import { DesEcbService } from './core/services';
import { PASSWORD_CONFIG } from './configs/desecb.config';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private desecbService:DesEcbService
  ) {}

  async login(users){
    const password = this.desecbService.decryptedDES(users.password,users.currentTime);
    const dec_password = this.desecbService.encryptedDES(password,PASSWORD_CONFIG.AGAIN);
    const usersData = await this.repository.find({
      where: { username: users.username,password:dec_password},
    });
    if(usersData.length > 0){
      return createResult({status:"success",code:HTTP_STATUS_CODE_ENUM.OK});
    }else{
       return createResult({status:"default",code:HTTP_STATUS_CODE_ENUM.DEFAULT});
    }
  }

  async register(userEntity){
    const username = await this.repository.find({
      where: { username: userEntity.username},
    });
    let userEntityarr = [];
    userEntityarr.push(userEntity);
    if(username.length > 0){
      return createResult({status:"default",code:HTTP_STATUS_CODE_ENUM.REPEAT});
    }else{
      const password = this.desecbService.decryptedDES(userEntity.password,userEntity.currentTime);
      const dec_password = this.desecbService.encryptedDES(password,PASSWORD_CONFIG.AGAIN);
      const newUserEntities = userEntityarr.map((user) => {
        const newUserEntity = new UserEntity();
        newUserEntity.username = user.username;
        newUserEntity.password = dec_password;
        newUserEntity.nickname = user.nickname;
        newUserEntity.phone = user.phoneNumber;
        return newUserEntity;
      });
      const createdUser = await this.repository.save(
        newUserEntities,
      );
      console.log(createdUser);
      return createResult({status:"success",code:HTTP_STATUS_CODE_ENUM.OK});
    }
  }
}
