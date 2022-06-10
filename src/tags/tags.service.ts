import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsRepository } from './tags.repository';
import { Tag } from 'src/tags/entities/tag.entity'

@Injectable()
export class TagsService {

  constructor(
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository
  ){}

  async create(createTagDto: CreateTagDto) {

    const tag = await this.tagsRepository.create(
      createTagDto,
    )

    await this.tagsRepository.save(tag);
    throw new HttpException("success", HttpStatus.OK);
  }

  findAll(search: string, page: string) {
    return this.tagsRepository.getTags({search, page});
  }

  findOne(page: number, id: number) {
    return this.tagsRepository.getTagsById({page}, id);
  }

  async findByNames(tagsName:Array<string>) {
    const tags = await this.tagsRepository.forEach(tagsName)
    return tags
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.tagsRepository.update(id, updateTagDto);
    const updatedTag = await this.tagsRepository.findOne(id)

    if (updatedTag) {
      return updatedTag
    }
    throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return this.tagsRepository.deleteTag(id);
  }
}
