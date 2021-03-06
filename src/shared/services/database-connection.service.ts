import { Injectable } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path';
import 'dotenv/config'

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // name: 'default',
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      dropSchema: false,
      logging: true,
      // entities: [join(__dirname, '**', '*.entity.{ts,js}')]
      entities: ['dist/**/*.entity.js'],
      // entities: [__dirname + '/**/*.entity.{ts,js}']
    }
  }
}
