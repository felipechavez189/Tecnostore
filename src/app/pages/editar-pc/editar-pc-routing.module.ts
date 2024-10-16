import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPcPage } from './editar-pc.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPcPageRoutingModule {}
