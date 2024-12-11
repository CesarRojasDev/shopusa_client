export interface UsuarioResponse {
    token:   string;
    usuario: Usuario;
}

export interface Usuario {
    id:        string;
    firstName: string;
    lastName:  string;
    username:  string;
    role:      string;
}
