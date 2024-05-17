import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ControllerContext } from '../type/controller-context.type';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export abstract class BaseGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  abstract canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>;

  getRequest(context: ExecutionContext) {
    const controllerContext = this.reflector.get(
      'controller_context',
      context.getClass(),
    ) as ControllerContext;

    switch (controllerContext) {
      case 'gql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
      default:
        return context.switchToHttp().getRequest();
    }
  }
}
