import { ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../constant/user.constant';
import { Roles } from '../decorator/roles.decorator';
import { BaseGuard } from './base.guard';

@Injectable()
export class RolesGuard extends BaseGuard {
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Role[]>(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = this.getRequest(context);
    const user = request.user;
    return roles.some((role) => user.role.name === role);
  }
}
