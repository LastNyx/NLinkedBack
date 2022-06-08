import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretsRepository } from './secrets.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([SecretsRepository]),
  ],
  controllers: [SecretsController],
  providers: [SecretsService]
})
export class SecretsModule {}
