import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Link } from "./entities/link.entity";

@EntityRepository(Link)
export class LinksRepository extends Repository<Link>{

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

  async getLinkByType(type: string){
    const link = await this.find({where: {type: type}})
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