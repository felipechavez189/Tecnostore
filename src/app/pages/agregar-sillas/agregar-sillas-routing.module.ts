import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarSillasPage } from './agregar-sillas.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarSillasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarSillasPageRoutingModule {}
