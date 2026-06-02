import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  /**
   * Compara una contraseña en texto plano con un hash de bcrypt.
   * Útil para el proceso de login.
   * @param plainPassword Contraseña ingresada por el usuario
   * @param hash Contraseña hasheada almacenada en la base de datos
   * @returns boolean indicando si coinciden
   */
  async comparePassword(plainPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}
