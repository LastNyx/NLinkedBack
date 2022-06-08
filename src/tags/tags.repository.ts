import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository, Like} from "typeorm";
import { Tag } from "./entities/tag.entity";
import { Post } from "src/posts/entities/post.entity";
import { In } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag>{

  async getTags(query){
    const search=query.search || ""

    const tags = await this.find({
      where: {name: Like('%' + search + '%')},
      order: {
        id: 'ASC'
      },
    })

    return {
      data: tags,
    }
  }

  async getTagsById(query, id: number){
    const take = 5
    const page=query.page || "1";
    const skip = (page-1) * take
    const tag = await this
                      .createQueryBuilder("tags")
                      .where("tags.id = :id", {id})
                      // .innerJoinAndSelect("tags.posts", 'posts')
                      // .leftJoinAndSelect("posts.images", 'images')
                      // .select("posts.tags","tags")
                      // .getMany()
                      .relation(Tag, "posts")
                      .of(1)
                      // .skip(skip)
                      //.take(take)
                      .loadMany()
                      //.getMany();
    // const tag = await this.findOne(id,{
    //   relations:['posts']
    // });
    if(tag){
      return tag;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  async deleteTag(id: number){
    const deleteTag = await this.delete(id);

    if (!deleteTag.affected) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    throw new HttpException('Success', HttpStatus.OK)
  }

  async forEach(tagsArray:Array<string>){

    const tagsObj = JSON.parse(JSON.stringify(tagsArray))
    const tags: Tag[] = [];

    for await (let item of tagsObj) {
      const tag = await this.findOne({where: {name: item.name}})
      if (!tag){
        const newTag = new Tag()
        newTag.name = item.name
        await this.save(newTag)
        tags.push(newTag)
      }else{
        tags.push(tag)
      }
    }

    return tags

    // tagsArray.forEach(async (item)=>{
    //   const tag = await this.findOne({where: {name: item}})
    //   if (!tag){
    //     const newTag = new Tag()
    //     newTag.name = item
    //     await this.save(newTag)
    //   }
    // })
    // return
  }
}