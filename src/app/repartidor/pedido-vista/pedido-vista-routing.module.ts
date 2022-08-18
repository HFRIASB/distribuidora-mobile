import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoVistaPage } from './pedido-vista.page';

const routes: Routes = [
  {
    path: ':idUsuario',
    component: PedidoVistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoVistaPageRoutingModule {}
