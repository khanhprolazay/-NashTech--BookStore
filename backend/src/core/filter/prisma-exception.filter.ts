import { ArgumentsHost, Catch } from "@nestjs/common";
import { PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

@Catch(PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError)
export class PrismaExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.sendStatus(400)
  }
}