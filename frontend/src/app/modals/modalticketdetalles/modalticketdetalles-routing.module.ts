import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalticketdetallesPage } from './modalticketdetalles.page';

const routes: Routes = [
  {
    path: '',
    component: ModalticketdetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalticketdetallesPageRoutingModule {}
