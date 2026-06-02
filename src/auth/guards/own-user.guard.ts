import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Rol } from '../../usuario/entities/usuario.entity';

@Injectable()
export class OwnUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user, params } = context.switchToHttp().getRequest();
    if (!user) return false;
    
    // Moderador tiene acceso total
    if (user.rol === Rol.MODERADOR) return true;
    
    // El usuario debe ser dueño del recurso (el id en la ruta debe coincidir con su userId del JWT)
    return user.userId === params.id;
  }
}
