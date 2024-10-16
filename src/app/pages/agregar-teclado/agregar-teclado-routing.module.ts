import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTecladoPage } from './agregar-teclado.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTecladoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTecladoPageRoutingModule {}
