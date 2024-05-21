import { Module } from '@nestjs/common';
import { GlobalModule } from './core/global.module';
import { AdminModule } from './admin/admin.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [GlobalModule, AdminModule, GraphQLModule],
})
export class AppModule {}
