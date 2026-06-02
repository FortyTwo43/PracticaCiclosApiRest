import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ArquitectoService } from './arquitecto.service';
import { CreateArquitectoDto } from './dto/create-arquitecto.dto';
import { UpdateArquitectoDto } from './dto/update-arquitecto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Rol } from '../usuario/entities/usuario.entity';

@Controller('arquitecto')
export class ArquitectoController {
  constructor(private readonly arquitectoService: ArquitectoService) {}

  @Post()
  create(@Body() createArquitectoDto: CreateArquitectoDto) {
    return this.arquitectoService.create(createArquitectoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR, Rol.CLIENTE)
  @Get()
  findAll() {
    return this.arquitectoService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR, Rol.CLIENTE, Rol.ARQUITECTO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arquitectoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR, Rol.ARQUITECTO)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArquitectoDto: UpdateArquitectoDto) {
    return this.arquitectoService.update(id, updateArquitectoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR, Rol.ARQUITECTO)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arquitectoService.remove(id);
  }
}
