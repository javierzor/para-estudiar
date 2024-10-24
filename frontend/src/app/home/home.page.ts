import { Component, ElementRef,Input, OnInit, ViewChildren } from '@angular/core';
import { FirebaseserviciosService } from '../service/firebaseservicios.service';
import { ModalController } from '@ionic/angular';
import { ModalticketdetallesPage } from '../modals/modalticketdetalles/modalticketdetalles.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Bookings: any = [];
  isModalOpen = false;
  selectedTicket: any = null;

  constructor(private firebaseserviciosservice: FirebaseserviciosService,
    private modalController: ModalController,
    private modalCtrl: ModalController
  ) {}
  ngOnInit() {
    this.fetchBookings();
    let bookingRes = this.firebaseserviciosservice.getBookingList();
    bookingRes.snapshotChanges().subscribe((res) => {
      this.Bookings = [];
      res.forEach((item) => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a);
      });
    });
  }
  fetchBookings() {
    this.firebaseserviciosservice
      .getBookingList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }
  deleteBooking(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.firebaseserviciosservice.deleteBooking(id);
    }
  }


  // Método para abrir el modal







  
  async openTicketModal(ticket: any) {
    this.selectedTicket = ticket;

    const modal = await this.modalCtrl.create({
      component: ModalticketdetallesPage, // El componente del modal
      componentProps: {
        ticket: this.selectedTicket
      }
    });

    return await modal.present();
  }

  // Método para cerrar el modal
  async closeTicketModal() {
    await this.modalCtrl.dismiss();
  }
  
}