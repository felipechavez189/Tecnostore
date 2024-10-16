import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAudifonoPage } from './agregar-audifono.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAudifonoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAudifonoPageRoutingModule {}
