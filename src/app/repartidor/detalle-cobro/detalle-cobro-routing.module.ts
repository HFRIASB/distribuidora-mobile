import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCobroPage } from './detalle-cobro.page';

const routes: Routes = [
  {
    path: ':id_repartidor/:id_cliente',
    component: DetalleCobroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCobroPageRoutingModule {}
