import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaDireccionPageRoutingModule } from './nueva-direccion-routing.module';

import { NuevaDireccionPage } from './nueva-direccion.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaDireccionPageRoutingModule
  ],
  declarations: [NuevaDireccionPage]
})
export class NuevaDireccionPageModule { }
