import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Client = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.getArgByIndex(0);
    return request.client;
  },
);
