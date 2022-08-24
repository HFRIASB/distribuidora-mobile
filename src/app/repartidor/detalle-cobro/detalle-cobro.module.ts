import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCobroPageRoutingModule } from './detalle-cobro-routing.module';

import { DetalleCobroPage } from './detalle-cobro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCobroPageRoutingModule
  ],
  declarations: [DetalleCobroPage]
})
export class DetalleCobroPageModule {}
