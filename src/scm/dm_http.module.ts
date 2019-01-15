import { Module } from '@nestjs/common';
import { DmHttpService } from './dm_http.service';
import { DmHttpController } from './dm_http.controller';

// 在Module的配置文件里配置对应的  controller  和  service
@Module({
  imports: [],
  controllers: [DmHttpController],
  providers: [DmHttpService]
})
export class DmHttpModule {}