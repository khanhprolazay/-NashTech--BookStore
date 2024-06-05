import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as hbs from "hbs";
import * as cookieParser from "cookie-parser";
import * as hbsutil from "hbs-utils";
import { ValidationPipe } from "@nestjs/common";
import { PrismaExceptionFilter } from "./core/filter/prisma-exception.filter";
import { HttpExceptionFilter } from "./core/filter/http-exception.filter";
import {
  caculateDiscount,
  eq,
  range,
  toDateString,
  getBookTitle,
  caculateTotal,
} from "./core/util/hbs.util";

hbs.registerHelper("range", range);
hbs.registerHelper("eq", eq);
hbs.registerHelper("toDateString", toDateString);
hbs.registerHelper("getBookTitle", getBookTitle);
hbs.registerHelper("caculateDiscount", caculateDiscount);
hbs.registerHelper("caculateTotal", caculateTotal);
hbs.registerHelper('ifeq', function (a, b, options) {
	if (a === b) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});
const utils = hbsutil(hbs);

dotenv.config({
  path: `${__dirname}/../.env`,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  app.setViewEngine("hbs");
  app.use(cookieParser());
  app.useStaticAssets(`${__dirname}/admin/public`);
  app.setBaseViewsDir(`${__dirname}/admin/view`);

  utils.registerPartials(`${__dirname}/admin/view/partial`);
  utils.registerWatchedPartials(`${__dirname}/admin/view/partial`);
  utils.precompilePartials();

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
