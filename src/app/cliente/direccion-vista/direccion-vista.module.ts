import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionVistaPageRoutingModule } from './direccion-vista-routing.module';

import { DireccionVistaPage } from './direccion-vista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionVistaPageRoutingModule
  ],
  declarations: [DireccionVistaPage]
})
export class DireccionVistaPageModule {}
