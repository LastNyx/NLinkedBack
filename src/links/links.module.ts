import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksRepository } from './links.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([LinksRepository]),
  ],
  controllers: [LinksController],
  providers: [LinksService]
})
export class LinksModule {}
