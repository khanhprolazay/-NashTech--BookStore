import { Global, Module } from '@nestjs/common';
import { APP_CONTEXT } from 'src/core/constant/app.constant';
import { AppContext } from 'src/core/type/app-context.type';

@Global()
@Module({})
export class AppContextModule {
  static forRoot(options: AppContext) {
    return {
      module: AppContextModule,
      providers: [
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
      exports: [
        {
          provide: APP_CONTEXT,
          useValue: options,
        },
      ],
    };
  }
}
