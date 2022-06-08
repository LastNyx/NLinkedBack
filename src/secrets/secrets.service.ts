import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSecretDto } from './dto/create-secret.dto';
import { UpdateSecretDto } from './dto/update-secret.dto';
import { SecretsRepository } from './secrets.repository';

@Injectable()
export class SecretsService {

  constructor(
    @InjectRepository(SecretsRepository)
    private secretsRepository: SecretsRepository
  ){}

  async create(createSecretDto: CreateSecretDto) {
    const link = this.secretsRepository.create(createSecretDto)

    await this.secretsRepository.save(link)
    throw new HttpException("success", HttpStatus.OK);
  }

  findAll() {
    return this.secretsRepository.getLinks();
  }

  findOne(id: number) {
    return this.secretsRepository.getLinkById(id);
  }

  async update(id: number, updateSecretDto: UpdateSecretDto) {
    await this.secretsRepository.update(id, updateSecretDto);
    const updatedLink = await this.secretsRepository.findOne(id)

    if (updatedLink) {
      return updatedLink
    }
    throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return this.secretsRepository.deleteLink(id);
  }
}
