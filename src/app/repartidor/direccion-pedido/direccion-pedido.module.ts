import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionPedidoPageRoutingModule } from './direccion-pedido-routing.module';

import { DireccionPedidoPage } from './direccion-pedido.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionPedidoPageRoutingModule
  ],
  declarations: [DireccionPedidoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DireccionPedidoPageModule {}
