export interface Publicacion {
    id:               string;
    fechaPublicacion: Date;
    precio:           number;
    skuPlataforma:    string;
    producto:         Producto;
    plataforma:       Plataforma;
    usuario:          Usuario;
}

export interface Plataforma {
    id:     string;
    nombre: string;
}

export interface Producto {
    id:             string;
    nombre:         string;
    sku:            string;
    precioUSD:      number;
    precioSoles:    number;
    marca:          string;
    modelo:         string;
    color:          string;
    stock:          number;
    descripcion:    string;
    caracteristica: string;
    link:           string;
    subCategoria:   SubCategoria;
    imagenesUrls:   string[];
}

export interface SubCategoria {
    id:         string;
    nombre:     string;
    codigo:     string;
    pesoGramos: number;
    ancho:      number;
    largo:      number;
    alto:       number;
    garantia:   string;
    categoria:  Categoria;
    productos:  any[];
}

export interface Categoria {
    id:           string;
    nombre:       string;
    subCategoria: any[];
}

export interface Usuario {
    id:                    string;
    firstName:             string;
    lastName:              string;
    username:              string;
    password:              string;
    role:                  string;
    enabled:               boolean;
    authorities:           Authority[];
    accountNonLocked:      boolean;
    credentialsNonExpired: boolean;
    accountNonExpired:     boolean;
}

export interface Authority {
    authority: string;
}
