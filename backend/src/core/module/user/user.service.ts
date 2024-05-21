import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  model() {
    return this.client.user;
  }
}
