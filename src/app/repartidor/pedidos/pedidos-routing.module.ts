import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosPage } from './pedidos.page';

const routes: Routes = [
  {
    path: ':idUsuario',
    component: PedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosPageRoutingModule {}
