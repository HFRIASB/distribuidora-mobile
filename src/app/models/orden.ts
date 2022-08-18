import { ControlEnvase } from "./control-envase";
import { Direccion } from "./direccion";
import { OrdenProducto } from "./orden-producto";
import { Usuario } from "./usuario";

export class Orden {

    id_ord: number;

    fVenta_ord: any;

    fEntrega_ord: any;

    estado_ord: string;

    numNota_ord: string;

    url_ord: string;

    descGeneral_ord: number;

    usuario: Usuario;

    direccion: Direccion;

    controlEnvase: ControlEnvase[];

    ordenProducto: OrdenProducto[];
}
