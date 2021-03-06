import { Orden } from "./orden";
import { Usuario } from "./usuario";

export class Direccion {

    id_direc: number;

    nombre_direc: string;

    lat_direc: string;

    lng_direc: string;

    rubro_direc: string;

    telefono_direc: string;

    usuario: Usuario;

    orden: Orden[];
}
