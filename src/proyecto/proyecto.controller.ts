import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Rol } from '../usuario/entities/usuario.entity';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ARQUITECTO, Rol.MODERADOR)
  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto);
  }

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(id);
  }
}
