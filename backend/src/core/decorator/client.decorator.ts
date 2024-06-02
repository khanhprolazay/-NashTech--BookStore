import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';

export const Client = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const type = context.getType<GqlContextType>();

    if (type === 'graphql') {
      const ctx = context.getArgByIndex(2);
      return ctx.req.client;
    }
    
    const request = context.getArgByIndex(0);
    return request.client;
  },
);
