import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMonitorPage } from './agregar-monitor.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMonitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMonitorPageRoutingModule {}
