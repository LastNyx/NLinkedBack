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
    const take= 10
    const page=query.page || "1"
    const skip= (page-1) * take 
    const search=query.search || ""

    const [tags, total] = await this.findAndCount({
      where: {name: Like('%' + search + '%')},
      order: {
        name: 'ASC'
      },
      take: take,
      skip: skip
    })

    const page_count = Math.ceil(total / take)
    const hasPrev = page > 1
    const hasNext = page < page_count
    let prev = null
    let next = null
    if (hasPrev){
      prev = parseInt(page)-1
    }
    if (hasNext){
      next = parseInt(page)+1
    }

    return {
      search_query: search,
      current_page: page,
      data: tags,
      total: total,
      page_count: page_count,
      hasPrev: page > 1,
      prev: prev,
      hasNext: page < page_count,
      next: next,
      per_page: take,
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