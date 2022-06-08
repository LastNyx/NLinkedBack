import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Image } from 'src/images/entities/image.entity'
import { PostsRepository } from './posts.repository';
import { ImagesRepository } from 'src/images/images.repository';
import { LinksRepository } from 'src/links/links.repository';
import { Link } from 'src/links/entities/link.entity';
import { User } from 'src/auth/entities/user.entity'
import { Tag } from 'src/tags/entities/tag.entity'
import { SecretsRepository } from 'src/secrets/secrets.repository';
import { Secret } from 'src/secrets/entities/secret.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(PostsRepository)
    private postRepository: PostsRepository,
    @InjectRepository(ImagesRepository) 
    private imageRepository:ImagesRepository,
    @InjectRepository(LinksRepository)
    private linksRepository:LinksRepository,
    @InjectRepository(SecretsRepository)
    private secretsRepository:SecretsRepository,
  ){}

  async create(createPostDto: CreatePostDto,tags: Array<Tag>, user:User) {
    
    /*const post = await this.postRepository.create(
      createPostDto,
    );*/

    const post = new Post()

    post.title = createPostDto.title

    const imgObj = JSON.parse(JSON.stringify(createPostDto.images))
    const linkObj = JSON.parse(JSON.stringify(createPostDto.links))
    const secretObj = JSON.parse(JSON.stringify(createPostDto.secrets))

    const links:Link[] = []
    const secrets:Secret[] = []
    const images:Image[] = []
    
    for await (let item of imgObj) {
      const image = await this.imageRepository.findOne({where: {link: item.link}})
      if (!image){
        const newImage = new Image()
        newImage.link = item.link
        await this.imageRepository.save(newImage)
        images.push(newImage)
      }else{
        images.push(image)
      }
    }

    for await (let item of linkObj) {
      const link = await this.linksRepository.findOne({where: {link: item.link}})
      if (!link){
        const newLink = new Link()
        newLink.link = item.link
        await this.linksRepository.save(newLink)
        images.push(newLink)
      }else{
        links.push(link)
      }
    }

    for await (let item of secretObj) {
      const secret = await this.secretsRepository.findOne({where: {link: item.link}})
      if (!secret){
        const newSecret = new Secret()
        newSecret.link = item.link
        await this.secretsRepository.save(newSecret)
        secrets.push(newSecret)
      }else{
        secrets.push(secret)
      } 
    }

    post.secrets = secrets
    post.links = links
    post.images = images
    post.tags = tags
    post.author = user

    await this.postRepository.save(post);
    
    throw new HttpException("success", HttpStatus.OK);
  }

  findAllPublic(page: number, search: string) {
    return this.postRepository.getPostsPublic({page, search});
  }

  findAll(page: number, search: string, user:User) {
    const userRole = user.role
    return this.postRepository.getPosts({page, search},userRole);
  }

  findOne(id: number, user:User) {
    const userRole = user.role || 'USER'
    return this.postRepository.getPostById(id, userRole);
  }

  findOnePub(id: number) {
    return this.postRepository.getPostByIdPub(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto, tags: Array<Tag>, user:User) {
    const updatedPost = await this.postRepository.findOne(id)
    if (updatedPost.author.name !== user.name){
      throw new HttpException("It's Not Yours", HttpStatus.UNAUTHORIZED)
    }
    updatedPost.title = updatePostDto.title
    updatedPost.tags = tags;

    const imgObj = JSON.parse(JSON.stringify(updatePostDto.images))
    const linkObj = JSON.parse(JSON.stringify(updatePostDto.links))
    const secretObj = JSON.parse(JSON.stringify(updatePostDto.secrets))

    const links:Link[] = []
    const secrets:Secret[] = []
    const images:Image[] = []

    for await (let item of imgObj) {
      const image = await this.imageRepository.findOne({where: {link: item.link}})
      if (!image){
        const newImage = new Image()
        newImage.link = item.link
        await this.imageRepository.save(newImage)
        images.push(newImage)
      }else{
        images.push(image)
      }
    }

    for await (let item of linkObj) {
      const link = await this.linksRepository.findOne({where: {link: item.link}})
      if (!link){
        const newLink = new Link()
        newLink.link = item.link
        await this.linksRepository.save(newLink)
        images.push(newLink)
      }else{
        links.push(link)
      }
    }

    for await (let item of secretObj) {
      const secret = await this.secretsRepository.findOne({where: {link: item.link}})
      if (!secret){
        const newSecret = new Secret()
        newSecret.link = item.link
        await this.secretsRepository.save(newSecret)
        secrets.push(newSecret)
      }else{
        secrets.push(secret)
      } 
    }

    updatedPost.secrets = secrets
    updatedPost.links = links

    updatedPost.images = images

    await this.postRepository.save(updatedPost)

    if (updatedPost) {
      return updatedPost
    }
    throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return this.postRepository.deletePost(id);
  }

  test(page: number, search: string, tag:string){
    return this.postRepository.test({page, search, tag})
  }
}
