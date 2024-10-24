import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IonCheckbox, LoadingController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { FirebaseserviciosService } from '../service/firebaseservicios.service';
import { ModalController } from '@ionic/angular';
import { ModalconfirmarformularioPage } from './../modals/modalconfirmarformulario/modalconfirmarformulario.page'

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {


  // Método para seleccionar un archivo usando el File Picker
  selectedFile: any; // Asegúrate de que esta variable esté definida

  @ViewChild("checkBox1", { static: false }) checkBox1: IonCheckbox;
  count = 5; // Inicializa el contador en 5 segundos
  fillHeight = 0; // Altura inicial del relleno en 0%
  isPaying = false;
  paymentConfirmed = false;
  paymentTimeout: any;
  interval: any;

  bookingForm: FormGroup;
  imagePreview: any;
  url_lista_para_el_backend: string;
  constructor(
    private modalCtrl: ModalController,
    public varios: VariosService,
    public loadingController: LoadingController,
    public firebaseserviciosservice: FirebaseserviciosService,
    private router: Router,
    public fb: FormBuilder
  ) { }
  ngOnInit() {

    this.bookingForm = this.fb.group({
      sitiowebnegocio: [''],
      nroticketfolio: [''],
      fechacompra: [''],
      horacompra: [''],
      montototal: [''],
    });
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      return this.firebaseserviciosservice
        .createBooking(this.bookingForm.value)
        .then((res) => {
          console.log('resresrers', res);
          this.bookingForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log('thiserrrrerer', error));
    }
  }

  verificar_si_el_formulario_y_demas_cosas_estan_correctas() {
    if (!this.bookingForm.valid) {
      this.varios.presentToast('Formulario invalido, llenar correctamente todos los campos');
      this.varios.modalerroresdeunoal9('Formulario invalido','asd','asd','asd','asd','asd','asd','asd','asd');
      return false;
    } else {
      if (!this.selectedFile) {
        this.varios.modalerroresdeunoal9('Debe seleccionar una imagen','asd','asd','asd','asd','asd','asd','asd','asd');
        this.varios.presentToast('Debe seleccionar una imagen');
        return false;
      }
      else {
        this.startPayment();
        return true;

      }
    }
  }


  startPayment() {




    if (!this.isPaying && !this.paymentConfirmed) {
      this.isPaying = true;
      this.count = 5; // Reiniciar el contador
      this.fillHeight = 0; // Reiniciar el llenado

      // Intervalo para actualizar el contador y el progreso visual cada segundo
      this.interval = setInterval(() => {
        this.count--;
        this.fillHeight += 20; // Aumenta el relleno en un 20% por segundo (5 segundos = 100%)
        if (this.count === 0) {
          clearInterval(this.interval);
          this.completePayment();
        }
      }, 1000);
    }
  }

  cancelPayment() {
    // Si se cancela antes de completar, reiniciar el progreso
    if (this.isPaying && !this.paymentConfirmed) {
      clearInterval(this.interval);
      this.isPaying = false;
      this.fillHeight = 0; // Reinicia el llenado del botón
    }
  }

  completePayment() {
    // Confirmar el pago al completar el contador
    this.isPaying = false;
    this.paymentConfirmed = true;
    this.esperadejamesubirlaentonces();

  }

  confirmo() {
    if (!this.checkBox1.checked) {
      this.checkBox1.checked = true;
    }
    else {
      this.checkBox1.checked = false;
    }
  }


  // codigo para subir a google drive con laravel
  handleDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // Aquí podemos añadir algún efecto visual para indicar que se puede soltar el archivo
  }

  handleDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log('File dropped:', file);
      this.selectedFile = file;
      // Simulamos que el archivo ha sido seleccionado manualmente para seguir el mismo flujo
      // this.onFileSelected({ target: { files: [file] } });
    }
  }


  // Función para manejar la selección del archivo
  async takePicture(event: any) {
    const input = <File>event.target.files[0]; // Obtén el archivo seleccionado
    this.selectedFile = input; // Guardamos el archivo que subiremos

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result; // Usamos esto solo para mostrar una vista previa
    };
    reader.readAsDataURL(input); // Lee el archivo como DataURL (base64) para previsualización
  }

  // Función para subir la imagen al servidor
  async esperadejamesubirlaentonces() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'bubbles',
      duration: 15000,
    });
    await loading.present();

    // Usamos FormData para enviar el archivo real
    const formData = new FormData();
    formData.append('file', this.selectedFile); // 'file' debe coincidir con el nombre esperado por Laravel

    this.varios.enviaralaravelfileparasubirdellaravelaldrive(formData).subscribe(
      (response) => {
        console.log('Archivo subido correctamente:', response);
        // this.url_lista_para_el_backend = 'https://drive.google.com/thumbnail?id=' + response['fileId'];
        this.url_lista_para_el_backend = 'https://drive.google.com/thumbnail?id=' + response['fileId'] + '&sz=w1000-h1000';

        // this.url_lista_para_el_backend = 'https://drive.google.com/uc?export=view&id=' + response['fileId'];
        // this.url_lista_para_el_backend = 'https://drive.google.com/file/d/' + response['fileId'] + '/preview';
        // this.url_lista_para_el_backend = 'https://drive.google.com/uc?export=download&id=' + response['fileId'];

        this.bookingForm.value['urlimagen'] = this.url_lista_para_el_backend;
        this.formSubmit();
        loading.dismiss(); // Oculta el indicador de carga
      },
      (error) => {
        console.error('Error al subir el archivo:', error);
        loading.dismiss(); // Oculta el indicador de carga si hay un error
      }
    );
  }





}