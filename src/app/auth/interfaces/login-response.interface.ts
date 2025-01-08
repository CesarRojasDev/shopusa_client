import { Usuario } from './usuario.interface';

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
