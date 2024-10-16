import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMousePage } from './agregar-mouse.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMousePageRoutingModule {}
