import { EntityRepository, Repository, Like, In, Equal} from "typeorm";
import { Post } from "./entities/post.entity"
import { Image } from "src/images/entities/image.entity"
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> { 

  async test(query){
    const limit= 5
    const page=query.page || "1";
    const search=query.search || ""
    const tag = query.tag || ""
    const skip= (page-1) * limit ;

    const posts = this.createQueryBuilder("posts")
        .leftJoinAndSelect("posts.author", "author")
        .leftJoinAndSelect("posts.images", "images")
        .leftJoin("posts.tags", "tags")
        .orderBy("posts.created_at", "DESC")
        // .groupBy("posts.id")
        // .take(limit)
        // .skip(skip)
        // .where("tags.name = :name", { name: tag })
        // .groupBy("posts.title")
        // .getMany()

    // if(tag !== ""){
    //   posts.where("tags.name = IN(:name)",{name: tag})
    // }

    // return posts
    return await paginate<Post>(posts, { page, limit, route: '/posts/test' });
  }

  async getPosts(query, userRole: string){
    const take= 5
    const page=query.page || "1";
    const skip= (page-1) * take ;
    const search=query.search || ""
    const tag = query.tag|| ""
    let secret = []
    if (userRole == "ADMIN" || userRole == "CONTRIBUTOR" || userRole == "PREMIUM_USER"){
      secret = ['secrets']
    }

    const [posts, total] = await this.findAndCount({
      where: [
        {title: Like('%' + search + '%')},
        {tags: {
          name: In(tag)
        }}
      ],
      order: {
        id: 'DESC'
      },
      
      relations: secret,
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
      data: posts,
      total: total,
      page_count: page_count,
      hasPrev: page > 1,
      prev: prev,
      hasNext: page < page_count,
      next: next,
      per_page: take,
    }
  }

  async getPostsPublic(query){
    const take= 5
    const page=query.page || "1";
    const skip= (page-1) * take ;
    const search=query.search || ""

    const [posts, total] = await this.findAndCount({
      where: {title: Like('%' + search + '%')},
      order: {
        id: 'DESC'
      },
      
      // relations: secret,
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
      data: posts,
      total: total,
      page_count: page_count,
      hasPrev: page > 1,
      prev: prev,
      hasNext: page < page_count,
      next: next,
      per_page: take,
    }
  }

  async getPostById(id: number, userRole:string){
    let secret = []
    if (userRole == "ADMIN" || userRole == "CONTRIBUTOR" || userRole == "PREMIUM_USER"){
      secret = ['secrets']
    }
    const post = await this.findOne(id, {relations: secret});
    if(post){
      return post;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  async getPostByIdPub(id: number){
    const post = await this.findOne(id);
    if(post){
      return post;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  async deletePost(id: number){
    const deletePost = await this.delete(id);

    if (!deletePost.affected) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    throw new HttpException('Success', HttpStatus.OK)
  }

}