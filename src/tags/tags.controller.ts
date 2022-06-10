import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/roles/roles.guard';
import Role from 'src/roles/enum/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { get } from 'http';

@Controller('tags')
@UseInterceptors(ClassSerializerInterceptor)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll(@Query() {search, page}) {
    return this.tagsService.findAll(search, page);
  }

  @Get(':id')
  findOne(@Query() {page}, @Param('id') id: string) {
    return this.tagsService.findOne(page, +id);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }


}
