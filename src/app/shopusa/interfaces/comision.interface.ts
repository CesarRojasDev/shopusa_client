export interface Comision {
    id:         string;
    valor:      number;
    categoria:  Categoria;
    plataforma: Plataforma;
}

export interface Categoria {
    id:           string;
    nombre:       string;
    subCategoria: any[];
}

export interface Plataforma {
    id:     string;
    nombre: string;
}
