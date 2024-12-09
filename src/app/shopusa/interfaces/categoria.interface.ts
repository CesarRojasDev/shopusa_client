import { Subcategoria } from './subcategoria.interface'

export interface Categoria {
  id: string
  nombre: string
  subCategoria: Subcategoria[]
}
