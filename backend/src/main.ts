import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';
import * as hbsutil from 'hbs-utils';

const utils = hbsutil(hbs);

dotenv.config({
  path: `${__dirname}/../.env`,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');
  app.use(cookieParser());
  app.useStaticAssets(`${__dirname}/admin/public`);
  app.setBaseViewsDir(`${__dirname}/admin/view`);
  utils.registerPartials(`${__dirname}/admin/view/partial`);
  utils.registerWatchedPartials(`${__dirname}/admin/view/partial`);
  utils.precompilePartials();
  await app.listen(5000);
}
bootstrap();
