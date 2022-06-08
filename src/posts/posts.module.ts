import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TagsService } from 'src/tags/tags.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.repository';
import { ImagesRepository } from 'src/images/images.repository';
import { LinksRepository } from 'src/links/links.repository';
import { TagsRepository } from 'src/tags/tags.repository';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from 'src/auth/users.repository';
import { SecretsRepository } from 'src/secrets/secrets.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsRepository]),
    TypeOrmModule.forFeature([ImagesRepository]),
    TypeOrmModule.forFeature([LinksRepository]),
    TypeOrmModule.forFeature([TagsRepository]),
    TypeOrmModule.forFeature([SecretsRepository]),
  ],
  controllers: [PostsController],
  providers: [PostsService,TagsService]
})
export class PostsModule {}
