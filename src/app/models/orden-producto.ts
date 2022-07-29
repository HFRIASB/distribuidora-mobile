import { Orden } from "./orden";
import { Producto } from "./producto";

export class OrdenProducto {

    id_op: number;

    cantidad_op: number;

    precioUni_op: number;

    descProducto_op: number;

    orden: Orden;
    
    producto: Producto;
}
