import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './entities';
import { DatabaseModule } from './core/modules/database';
import { DATABASE_CONFIG } from './configs/database.config';
import { DesEcbService } from './core/services';

const systemEntities = [
  UserEntity
];
const entities = [...systemEntities]
const modules=[
  DatabaseModule.forRoot(DATABASE_CONFIG, entities)
]

@Module({
  imports:modules,
  controllers: [AppController],
  providers: [AppService,DesEcbService],
})
export class AppModule {}
