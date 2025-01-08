import { Categoria } from './categoria.interface';
import { Plataforma } from './plataforma.interface';

export interface Comision {
  id: string;
  valor: number;
  categoria: Categoria;
  plataforma: Plataforma;
}
