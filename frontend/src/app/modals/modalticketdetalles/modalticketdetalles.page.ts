import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalticketdetalles',
  templateUrl: './modalticketdetalles.page.html',
  styleUrls: ['./modalticketdetalles.page.scss'],
})
export class ModalticketdetallesPage {
  @Input() ticket: any;

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
