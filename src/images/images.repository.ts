import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Image } from "./entities/image.entity";

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {

  async getImage(){
    const images = await this.find({
      order:{
        id: "ASC"
      }
    })

    return {
      data: images
    }
  }


  async getImageById(id: number){
    const image = await this.findOne(id);
    if(image){
      return image;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  async deleteImage(id: number){
    const deleteImage = await this.delete(id);

    if (!deleteImage.affected) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    throw new HttpException('Success', HttpStatus.OK)
  }

}