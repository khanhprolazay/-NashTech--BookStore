import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';

dotenv.config({
  path: `${__dirname}/../.env`,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');
  app.useStaticAssets(`${__dirname}/../src/admin/public`);
  app.setBaseViewsDir(`${__dirname}/../src/admin/view`);
  hbs.registerPartials(`${__dirname}/../src/admin/view/partial`);
  await app.listen(5000);
}
bootstrap();
