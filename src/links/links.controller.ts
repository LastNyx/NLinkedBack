import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Roles } from 'src/roles/roles.decorator';
import Role from 'src/roles/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/roles/roles.guard';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(+id);
  }

  // @Get('/type/:type')
  // findByType(@Param('type') type: string){
  //   return this.linksService.findByType(type)
  // }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}
