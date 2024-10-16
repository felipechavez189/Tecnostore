import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMonitorPage } from './editar-monitor.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMonitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMonitorPageRoutingModule {}
