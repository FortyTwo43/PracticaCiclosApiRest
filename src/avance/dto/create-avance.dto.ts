import { IsDate, IsDateString, IsEmail, isNotEmpty, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Imagen } from 'src/imagen/entities/imagen.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';

export class CreateAvanceDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    descripcion: string;

    @IsDateString()
    @IsNotEmpty()
    fecha: string;


    @IsNotEmpty()
    imagen: Imagen;

    @IsNotEmpty()
    proyecto: Proyecto;
}
