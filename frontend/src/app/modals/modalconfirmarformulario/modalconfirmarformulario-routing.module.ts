import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalconfirmarformularioPage } from './modalconfirmarformulario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalconfirmarformularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalconfirmarformularioPageRoutingModule {}
