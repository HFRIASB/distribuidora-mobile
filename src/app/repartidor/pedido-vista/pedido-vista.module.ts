import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoVistaPageRoutingModule } from './pedido-vista-routing.module';

import { PedidoVistaPage } from './pedido-vista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoVistaPageRoutingModule
  ],
  declarations: [PedidoVistaPage]
})
export class PedidoVistaPageModule {}
