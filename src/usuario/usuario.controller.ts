import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnUserGuard } from '../auth/guards/own-user.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Rol } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.MODERADOR)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnUserGuard)
  @Roles(Rol.MODERADOR, Rol.CLIENTE, Rol.ARQUITECTO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnUserGuard)
  @Roles(Rol.MODERADOR, Rol.CLIENTE, Rol.ARQUITECTO)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnUserGuard)
  @Roles(Rol.MODERADOR, Rol.CLIENTE, Rol.ARQUITECTO)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
