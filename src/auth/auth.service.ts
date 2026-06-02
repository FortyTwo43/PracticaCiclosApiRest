import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usuariosRepository.findOne({ where: { email: loginDto.email } });

    const passwordValid = user && await bcrypt.compare(loginDto.password, user.password);
    if (passwordValid) {
      const payload = { email: user.email, sub: user.id_usuario, rol: user.rol };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    
    throw new UnauthorizedException('Credenciales inválidas');
  }
  
  async comparePassword(plainPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}
