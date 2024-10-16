import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAudifonoPageRoutingModule } from './agregar-audifono-routing.module';

import { AgregarAudifonoPage } from './agregar-audifono.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAudifonoPageRoutingModule
  ],
  declarations: [AgregarAudifonoPage]
})
export class AgregarAudifonoPageModule {}
