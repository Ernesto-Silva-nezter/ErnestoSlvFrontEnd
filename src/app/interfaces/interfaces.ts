export interface Usuario{
  id?: number;
  nombre?: string;
  direccion?: string;
  telefono?: string;
  codigoPostal?: string;
  tipoUsuario?: string;
  estado?: string;
  ciudad?: string;
  rol?: string;
  acceso?: string;
  contrasena?: string;
}

export interface Estado
{
  catalog_Key?: number;
  entidad_Federativa?: string;
  abreviatura?: string;
}

export interface Municipios
{
  catalog_Key?: number;
  municipio?: string;
  efe_Key?: string;
  estatus?: string;
}
