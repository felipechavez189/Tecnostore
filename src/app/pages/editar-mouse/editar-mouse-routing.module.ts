import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMousePage } from './editar-mouse.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMousePageRoutingModule {}
