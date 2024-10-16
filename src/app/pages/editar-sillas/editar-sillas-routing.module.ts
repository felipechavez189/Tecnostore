import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarSillasPage } from './editar-sillas.page';

const routes: Routes = [
  {
    path: '',
    component: EditarSillasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarSillasPageRoutingModule {}
