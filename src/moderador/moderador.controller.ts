import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ModeradorService } from './moderador.service';
import { CreateModeradorDto } from './dto/create-moderador.dto';
import { UpdateModeradorDto } from './dto/update-moderador.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Rol } from '../usuario/entities/usuario.entity';

@Controller('moderadores')
export class ModeradorController {
  constructor(private readonly moderadorService: ModeradorService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR)
  @Post()
  create(@Body() dto: CreateModeradorDto) {
    return this.moderadorService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR)
  @Get()
  findAll() {
    return this.moderadorService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderadorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateModeradorDto) {
    return this.moderadorService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderadorService.remove(id);
  }
}
