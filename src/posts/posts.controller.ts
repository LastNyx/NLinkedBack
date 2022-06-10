import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface'
import { TagsService } from 'src/tags/tags.service';
import RoleGuard from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import Role from 'src/roles/enum/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { Connection } from 'typeorm';
import { PostsRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalAuthGuard } from 'src/auth/localAuth.guard';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(
    private postsService: PostsService,
    private tagsService: TagsService,
    @InjectRepository(PostsRepository)
    private postRepository: PostsRepository,
    //private usersService: AuthService,
  ) {}

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    //const user = await this.usersService.getCurrentUser(req)
    const tags = await this.tagsService.findByNames(createPostDto.tags)
    return this.postsService.create(createPostDto, tags, req.user);
  }

  @Get("tag")
  getTest(@Query() {page, search, tag}){
    return this.postsService.test(page, search, tag)
  }

  @Get()
  findAllPublic(@Query() {page, search}) {
    return this.postsService.findAllPublic(page, search);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR,Role.PREMIUM_USER,Role.USER)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get('loggedin')
  findAll(@Query() {page, search}, @Req() req: RequestWithUser) {
    return this.postsService.findAll(page, search, req.user);
  }

  @Get('random')
  async findRand(){
    const posts = await this.postRepository.createQueryBuilder("posts")
            .leftJoinAndSelect("posts.images", "images")
            .orderBy("RAND()")
            .limit(5)
            .getMany();
    return posts
  }

  @Get(':id/public')
  findOnePublic(@Param('id') id: string) {
    return this.postsService.findOnePub(+id);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR,Role.PREMIUM_USER,Role.USER)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.postsService.findOne(+id, req.user);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: RequestWithUser) {
    const tags = await this.tagsService.findByNames(updatePostDto.tags)
    return this.postsService.update(+id, updatePostDto, tags, req.user);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  //@Post('test')
  //test(@Body() createPostDto: CreatePostDto/*, @Req() req: RequestWithUser*/) {
    //return JSON.stringify(createPostDto);
  //}
}
