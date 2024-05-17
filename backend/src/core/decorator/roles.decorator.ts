import { Reflector } from '@nestjs/core';
import { Role } from '../constant/user.constant';

export const Roles = Reflector.createDecorator<Role[]>();
