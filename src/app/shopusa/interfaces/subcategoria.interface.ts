import { Categoria } from './categoria.interface'

export interface Subcategoria {
  id: string
  nombre: string
  codigo: string
  pesoGramos: number
  ancho: number
  largo: number
  alto: number
  garantia: string
  categoria: Categoria
  productos: any[]
}
