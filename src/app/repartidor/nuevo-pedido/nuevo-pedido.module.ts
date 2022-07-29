import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPedidoPageRoutingModule } from './nuevo-pedido-routing.module';

import { NuevoPedidoPage } from './nuevo-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoPedidoPageRoutingModule
  ],
  declarations: [NuevoPedidoPage]
})
export class NuevoPedidoPageModule {}
