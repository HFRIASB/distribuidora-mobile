import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionPedidoPage } from './direccion-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionPedidoPageRoutingModule {}
