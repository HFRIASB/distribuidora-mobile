import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionVistaPageRoutingModule } from './direccion-vista-routing.module';

import { DireccionVistaPage } from './direccion-vista.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionVistaPageRoutingModule
  ],
  declarations: [DireccionVistaPage]
})
export class DireccionVistaPageModule { }
