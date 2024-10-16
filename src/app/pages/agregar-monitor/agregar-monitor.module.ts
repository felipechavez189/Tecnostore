import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMonitorPageRoutingModule } from './agregar-monitor-routing.module';

import { AgregarMonitorPage } from './agregar-monitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMonitorPageRoutingModule
  ],
  declarations: [AgregarMonitorPage]
})
export class AgregarMonitorPageModule {}
