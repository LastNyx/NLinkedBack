import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksRepository } from './links.repository';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(LinksRepository)
    private linksRepository: LinksRepository
  ){}

  async create(createLinkDto: CreateLinkDto) {

    const link = this.linksRepository.create(createLinkDto)

    await this.linksRepository.save(link)
    throw new HttpException("success", HttpStatus.OK);
  }

  findAll() {
    return this.linksRepository.getLinks();
  }

  findOne(id: number) {
    return this.linksRepository.getLinkById(id);
  }

  findByType(type: string) {
    return this.linksRepository.getLinkByType(type);
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    await this.linksRepository.update(id, updateLinkDto);
    const updatedLink = await this.linksRepository.findOne(id)

    if (updatedLink) {
      return updatedLink
    }
    throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return this.linksRepository.deleteLink(id);
  }
}
