import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPcPage } from './agregar-pc.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarPcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarPcPageRoutingModule {}
