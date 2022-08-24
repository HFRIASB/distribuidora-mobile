import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPedidoPageRoutingModule } from './nuevo-pedido-routing.module';

import { NuevoPedidoPage } from './nuevo-pedido.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoPedidoPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [NuevoPedidoPage]
})
export class NuevoPedidoPageModule {}
