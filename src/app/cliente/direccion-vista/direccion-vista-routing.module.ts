import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionVistaPage } from './direccion-vista.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionVistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionVistaPageRoutingModule {}
