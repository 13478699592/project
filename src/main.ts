import { config} from 'dotenv'
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(join(__dirname, '.', 'assets'), {})
  await app.listen(8888);
}
bootstrap();
