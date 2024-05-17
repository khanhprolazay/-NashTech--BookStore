import { SetMetadata } from '@nestjs/common';
import { ControllerContext as ControllerContextType } from '../type/controller-context.type';

export const ControllerContext = (context: ControllerContextType) =>
  SetMetadata('controller_context', context);
