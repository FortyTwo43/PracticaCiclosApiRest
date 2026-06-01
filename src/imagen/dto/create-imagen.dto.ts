import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
import { Avance } from 'src/avance/entities/avance.entity';

export class CreateImagenDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imagen_url: string;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  proyecto: Proyecto;

  avance?: Avance;   

}
