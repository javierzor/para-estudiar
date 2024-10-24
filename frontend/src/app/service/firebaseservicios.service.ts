import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class FirebaseserviciosService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create
  // createBooking(valoresdelformulario) {
  //   return this.bookingListRef.push({
  //     sitiowebnegocio: valoresdelformulario.sitiowebnegocio,
  //     nroticketfolio: valoresdelformulario.nroticketfolio,
  //     fechacompra: valoresdelformulario.fechacompra,
  //     horacompra: valoresdelformulario.horacompra,
  //     montototal: valoresdelformulario.montototal,
  //   });
  // }

  createBooking(datosformulario) {
    let toSave = {
      sitiowebnegocio: datosformulario.sitiowebnegocio,
      nroticketfolio: datosformulario.nroticketfolio,
      fechacompra: datosformulario.fechacompra,
      horacompra: datosformulario.horacompra,
      montototal: datosformulario.montototal,
      urlimagen:datosformulario.urlimagen
    }
    return this.db.list('/tiemporealcosas/factuticketapp923788/solicitudes/').push(toSave);
  }



  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/tiemporealcosas/factuticketapp923788/solicitudes/' + id);
    return this.bookingRef;
  }
  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/tiemporealcosas/factuticketapp923788/solicitudes');
    return this.bookingListRef;
  }
  // Update
  updateBooking(id: any, datosformulario) {
    return this.bookingRef.update({
      name: datosformulario.name,
      email: datosformulario.email,
      mobile: datosformulario.mobile,
    });
  }
  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/tiemporealcosas/factuticketapp923788/solicitudes/' + id);
    this.bookingRef.remove();
  }
}
