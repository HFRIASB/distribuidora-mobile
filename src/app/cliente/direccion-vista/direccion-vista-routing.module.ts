import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionVistaPage } from './direccion-vista.page';

const routes: Routes = [
  {
    path: ':id_user/:id_direccion',
    component: DireccionVistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionVistaPageRoutingModule {}
