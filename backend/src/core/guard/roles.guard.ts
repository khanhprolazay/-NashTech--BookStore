import { ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../constant/user.constant';
import { Roles } from '../decorator/roles.decorator';
import { BaseGuard } from './base.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard extends BaseGuard {

  constructor( private readonly reflector: Reflector ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Role[]>(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = this.getRequest(context);
    const client = request.client;
    const realmRoles = client.realm_access.roles;
    return roles.some((role) => realmRoles.includes(role));
  }
}
