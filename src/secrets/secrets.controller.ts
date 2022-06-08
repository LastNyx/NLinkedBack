import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { CreateSecretDto } from './dto/create-secret.dto';
import { UpdateSecretDto } from './dto/update-secret.dto';
import { Roles } from 'src/roles/roles.decorator';
import Role from 'src/roles/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/roles/roles.guard';

@Controller('secrets')
@UseInterceptors(ClassSerializerInterceptor)
export class SecretsController {
  constructor(private readonly linksService: SecretsService) {}

  @Roles(Role.ADMIN,Role.CONTRIBUTOR,Role.PREMIUM_USER)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post()
  create(@Body() createLinkDto: CreateSecretDto) {
    return this.linksService.create(createLinkDto);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR,Role.PREMIUM_USER)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR,Role.PREMIUM_USER)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(+id);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR,Role.PREMIUM_USER)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateSecretDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Roles(Role.ADMIN,Role.CONTRIBUTOR,Role.PREMIUM_USER)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}
