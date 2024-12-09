import { Subcategoria } from "./subcategoria.interface";

export interface Producto {
    id:             string;
    nombre:         string;
    sku:            string;
    precioUSD:      number;
    precioSoles?:   number;
    marca:          string;
    modelo:         string;
    color:          string;
    stock?:         number;
    descripcion:    string;
    caracteristica: string;
    link:           string;
    subCategoria:   Subcategoria;
    imagenesUrls:   string[];
    imagenPrincipal?: string;
}