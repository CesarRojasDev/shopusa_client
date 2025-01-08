import { Plataforma } from './plataforma.interface';
import { Producto } from './producto.interface';
import { Usuario } from '../../auth/interfaces/usuario.interface';

export interface Publicacion {
  id: string;
  fechaPublicacion: Date;
  precio: number;
  skuPlataforma: string;
  producto: Producto;
  plataforma: Plataforma;
  usuario: Usuario;
}

export interface Authority {
  authority: string;
}
