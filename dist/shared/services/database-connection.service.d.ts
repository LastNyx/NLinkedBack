import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
export declare class DatabaseConnectionService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
