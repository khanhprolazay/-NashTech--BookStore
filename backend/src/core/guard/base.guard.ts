import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export abstract class BaseGuard implements CanActivate {
  constructor() {}

  abstract canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>;

  getRequest(context: ExecutionContext) {
    const type = context.getType<GqlContextType>();

    switch (type) {
      case "graphql":
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
      default:
        return context.switchToHttp().getRequest();
    }
  }
}
