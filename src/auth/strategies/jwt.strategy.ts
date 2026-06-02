import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: any) {
    const user = await this.usuariosRepository.findOne({ where: { id_usuario: payload.sub } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email, rol: user.rol };
  }
}
