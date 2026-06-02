import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../usuario/entities/usuario.entity';

describe('AuthService and Usuario Hash', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Password Hashing', () => {
    it('debería encriptar la contraseña correctamente al usar hashPassword', async () => {
      const usuario = new Usuario();
      usuario.password = 'supersecreto123';
      
      await usuario.hashPassword(); // simulamos el hook @BeforeInsert

      expect(usuario.password).not.toBe('supersecreto123');
      expect(usuario.password.startsWith('$2b$')).toBe(true); // $2b$ es el prefijo de bcrypt
    });

    it('debería retornar true si la contraseña coincide (login válido)', async () => {
      const myPlaintextPassword = 'miPasswordSeguro';
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(myPlaintextPassword, salt);

      const isValid = await service.comparePassword(myPlaintextPassword, hash);
      expect(isValid).toBe(true);
    });

    it('debería retornar false si la contraseña es incorrecta', async () => {
      const hash = await bcrypt.hash('passwordCorrecto', 10);
      
      const isInvalid = await service.comparePassword('passwordIncorrecto', hash);
      expect(isInvalid).toBe(false);
    });
  });
});
