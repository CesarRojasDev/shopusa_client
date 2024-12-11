export interface ProductResponse {
    totalElements:    number;
    totalPages:       number;
    size:             number;
    content:          Producto[];
    number:           number;
    sort:             Sort;
    first:            boolean;
    last:             boolean;
    numberOfElements: number;
    pageable:         Pageable;
    empty:            boolean;
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

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
