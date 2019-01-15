import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity, UserListEntity } from './entities';
import { DatabaseModule } from './core/modules/database';
import { DATABASE_CONFIG } from './configs/database.config';
import { DesEcbService } from './core/services';
import { DmHttpModule } from './scm/dm_http.module';

const systemEntities = [
  UserEntity,
  UserListEntity
];
const entities = [...systemEntities]
const modules=[
  DmHttpModule,
  DatabaseModule.forRoot(DATABASE_CONFIG, entities)
]

const service = [
  AppService,
  DesEcbService
]
@Module({
  imports:modules,
  controllers: [AppController],
  providers: [...service],
})
export class AppModule {}
