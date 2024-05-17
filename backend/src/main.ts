import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config({
  path: `${__dirname}/../.env`,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(`${__dirname}/../src/admin/public`);
  app.setBaseViewsDir(`${__dirname}/../src/admin/view`);
  app.setViewEngine('hbs');
  await app.listen(5000);

}
bootstrap();
