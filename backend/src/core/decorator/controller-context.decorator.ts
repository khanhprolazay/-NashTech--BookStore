import { SetMetadata } from '@nestjs/common';
import { ControllerContext as ControllerContextType } from '../type/controller-context.type';
import { CONTROLLER_CONTEXT } from '../constant/app.constant';

export const ControllerContext = (context: ControllerContextType) =>
  SetMetadata(CONTROLLER_CONTEXT, context);
