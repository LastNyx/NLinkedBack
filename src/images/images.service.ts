import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesRepository } from './images.repository'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesRepository)
    private imagesRepository:ImagesRepository
  ){}

  async create(createImageDto: CreateImageDto) {

    const image = this.imagesRepository.create(createImageDto)

    await this.imagesRepository.save(image)
    throw new HttpException("success", HttpStatus.OK);
  }

  findAll() {
    return this.imagesRepository.getImage();
  }

  findOne(id: number) {
    return this.imagesRepository.getImageById(id);
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    await this.imagesRepository.update(id, updateImageDto);
    const updatedImage = await this.imagesRepository.findOne(id)

    if (updatedImage) {
      return updatedImage
    }
    throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return this.imagesRepository.deleteImage(id);
  }
}
