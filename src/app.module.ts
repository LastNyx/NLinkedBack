import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { ImagesModule } from './images/images.module';
import { LinksModule } from './links/links.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { SecretsModule } from './secrets/secrets.module';

import * as Joi from '@hapi/joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    PostsModule,
    ImagesModule,
    LinksModule,
    TagsModule,
    AuthModule,
    RolesModule,
    SecretsModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
