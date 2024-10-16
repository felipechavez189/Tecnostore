import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPcPageRoutingModule } from './agregar-pc-routing.module';

import { AgregarPcPage } from './agregar-pc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPcPageRoutingModule
  ],
  declarations: [AgregarPcPage]
})
export class AgregarPcPageModule {}
