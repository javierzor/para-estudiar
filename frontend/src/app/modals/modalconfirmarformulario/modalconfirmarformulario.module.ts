import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalconfirmarformularioPageRoutingModule } from './modalconfirmarformulario-routing.module';

import { ModalconfirmarformularioPage } from './modalconfirmarformulario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalconfirmarformularioPageRoutingModule
  ],
  declarations: [ModalconfirmarformularioPage]
})
export class ModalconfirmarformularioPageModule {}
