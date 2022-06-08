import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Secret } from "./entities/secret.entity";

@EntityRepository(Secret)
export class SecretsRepository extends Repository<Secret>{

  async getLinks(){

    const links = await this.find({
      order: {
        id: 'ASC'
      },
    })

    return {
      data: links,
    }
  }

  async getLinkById(id: number){
    const link = await this.findOne(id);
    if(link){
      return link;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  async deleteLink(id: number){
    const deleteLink = await this.delete(id);

    if (!deleteLink.affected) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    throw new HttpException('Success', HttpStatus.OK)
  }
}