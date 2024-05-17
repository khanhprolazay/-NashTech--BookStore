import { Module } from '@nestjs/common';
import { GlobalModule } from './core/global.module';
import { BookModule } from './book/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    GlobalModule,
    BookModule,
    AdminModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
  ],
})
export class AppModule {}
