import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ModalconfirmarformularioPage } from '../modals/modalconfirmarformulario/modalconfirmarformulario.page';
@Injectable({
  providedIn: 'root'
})
export class VariosService {
  secretKey = "123456&Descryption";
  isLoading = false;
  isLoadingElMono: boolean = false;
  tipo_cuenta: any;
  activar_realtime_paqueteria: boolean = false;
  activar_realtime_resumen_home: boolean = false;
  activar_realtime_user_conversaciones: boolean = false;
  activar_realtime_admin_conversaciones: boolean = false;
  activar_real_time_modal_ver_conversacion_chat: boolean = false;
  ir_a_registro: string = 'registro';
  profileInfo: any;
  loadingmono: any;
  periodo_pausado_de_modal_en_desarrollo: boolean = false;
  datadollarplusappupdateporid: any;
  activar_real_time_admin_solicitudes: boolean = false;
  temporal_soles_a_recibir: any;
  temporal_soles_a_enviar: any;
  temporal_dolares_a_recibir: any;
  temporal_dolares_a_enviar: any;
  pais_seleccionado_con_bandera: { name: string; code: string; iso: string; flag: string; mask: string; };

  constructor(
    private modalCtrl: ModalController,

    private modalController: ModalController,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient,
    private router: Router,
  ) {
  }


  variasfunciones(data: any) {
    var url = 'http://localhost:8000/api/upload';
    return this.http.post(url, data,
      { headers: new HttpHeaders({ "Content-Type": 'application/json' }) });
  }


  precioscrypto(data) {
    var url = 'https://min-api.cryptocompare.com/data/v2/histominute';
    return this.http.post(url, data,
      { headers: new HttpHeaders({ "Content-Type": 'application/json' }) });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  async loading2segundos(mensaje) {
    const actualizando = await this.loadingController.create({
      message: mensaje,
      duration: 1500,
      spinner: "lines",
      cssClass: 'custom-loader-class'
    });
    actualizando.present();
  }
  async loading1segundos(mensaje) {
    const loadingunsegundo = await this.loadingController.create({
      message: mensaje, duration: 1000, spinner: "lines",
      cssClass: 'custom-loader-class'
    });
    loadingunsegundo.present();
  }
  async quitarloading() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
  async quitarloadingElMono() {
    this.isLoadingElMono = false;
    return await this.loadingController.dismiss();
  }
  async loading18segundos(mensaje) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 18000,
        spinner: "lines",
        message: mensaje,
        cssClass: 'custom-loader-class'
      })
      .then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => { });
          }
        });
      });
  }
  funciondeRETRASAR(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // encrypt(value: string): string {
  //   if (value) {
  //     return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  //   }
  // }
  // decrypt(textToDecrypt: string) {
  //   if (textToDecrypt) {
  //     return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  //   }
  // }
  logout() {
    localStorage.removeItem('profileInfo');
    // localStorage.clear();
    this.router.navigate(['login']);
  }
  async MostrarYOcultarAlertaMono(loadingodismiss) {
    console.log({loadingodismiss})
    this.isLoadingElMono = true;
    if (loadingodismiss && loadingodismiss == 'present') {
      this.loadingmono = await this.loadingController.create({
        duration: 8000,
        message: ' ',
        cssClass: 'loading-del-mono',
        spinner: null,
      })
        .then(a => {
          a.present().then(() => {
            if (!this.isLoadingElMono) {
              a.dismiss().then(() => { });
            }
          });
        });
      ;
      this.loadingmono.present();
    }
    else {
      setTimeout(() => {
        this.quitarloadingElMono();
        this.loadingmono.dismiss();
        this.loadingmono = null;
      },
        500);
    }
  }
  async MostrarYOcultarAlertaMono2segundos() {
    this.loadingmono = await this.loadingController.create({
      duration: 1600,
      message: ' ',
      cssClass: 'loading-del-mono',
      spinner: null,
    });
    this.loadingmono.present();
  }

  BorrarHistorialNoBackButtonWPAExploradoresBrowser() {
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function (event) {
      history.pushState(null, document.title, location.href);
    });
  }
  SacarAlLogin() {
    this.MostrarYOcultarAlertaMono2segundos();
    this.BorrarHistorialNoBackButtonWPAExploradoresBrowser();
    this.logout();
  }

  // ConsultarUsuarioMayorANumero1() {
  //   this.profileInfo = localStorage.getItem('profileInfo');
  //   if (this.profileInfo) {
  //     // se Cumplio: ProfileInfo existe en el cache
  //     this.profileInfo = this.decrypt(this.profileInfo);
  //     if(this.profileInfo!=undefined&&this.profileInfo!=null&&this.profileInfo!=''){
  //             // se Cumplio: ProfileInfo es diferente a (Vacio, null o indefinido)
  //       this.profileInfo = JSON.parse(this.profileInfo);
  //       if (this.profileInfo && this.profileInfo.id && this.profileInfo.id>1&& this.profileInfo.id<1000000) {
  //         // se Cumplio: ProfileInfo.id existe y es un rango adecuado)
  //         this.datadollarplusappupdateporid = {
  //           nombre_solicitud: 'dollarplusappupdateporid',
  //           id: this.profileInfo.id
  //         }
  //         this.variasfunciones(this.datadollarplusappupdateporid).subscribe(async (res: any) => {
  //           console.log(' respuesta dollarplusappupdateporid In Service ', res);
  //           if(!res||!res.id||res.id<1||res.status=='inactivo'){
  //             // se Cumplio o NO: que no hay respuesta, el id no vino o estatus no es activo

  //             this.router.navigate(['login']);
  //           }
  //           else{
  //               // se Cumplio: el usuario existe
  //               localStorage.setItem('profileInfo', this.encrypt(JSON.stringify(res)));
  //               if (res.tipo_cuenta < 1) {
  //                 this.router.navigate(['login']);
  //               }
  //               else {
  //             // se Cumplio: Es Mayor a 1
  //               }
  //           }
  //         });
  //       }
  //       else {
  //         this.router.navigate(['login']);
  //       }


  //     }
  //     else{
  //       this.router.navigate(['login']);
  //     }

  //   }
  //   else {
  //     this.router.navigate(['login']);
  //   }

  //   var url = 'https://equipojotamar.com/backend/public/api/variasfunciones';
  //   return this.http.post(url, this.datadollarplusappupdateporid,
  //     { headers: new HttpHeaders({ "Content-Type": 'application/json' }) });
  // }


  // variasfunciones222222222(data: any) {
  //   var url = 'http://localhost:8000/api/upload';
  //   return this.http.post(url, data,
  //     { headers: new HttpHeaders({ "Content-Type": 'multipart/form-data' }) });
  // }

  // Función para enviar el archivo al servidor
  enviaralaravelfileparasubirdellaravelaldrive(formData: FormData) {
    const url = 'http://localhost:8000/api/upload';
    return this.http.post(url, formData); // No es necesario establecer Content-Type con FormData
  }



  // variasfunciones333333(file: File) {
  //   const url = 'http://localhost:8000/api/upload';
  //   const formData = new FormData();
  //   formData.append('file', file); // 'file' debe coincidir con el nombre del campo esperado en Laravel
  
  //   return this.http.post(url, formData, {
  //     headers: new HttpHeaders({
  //       // No necesitas especificar 'multipart/form-data', Angular lo hace automáticamente cuando usas FormData
  //     }),
  //   });
  // }

  public generateuuurltodrivefromlaraveloffff(file: File): any {
    let formData: FormData = new FormData();
    formData.append('image', file);
    let url = "http://localhost:8000/api/upload";
    return this.http.post(url, formData);
  }


  public generateUrl(file: File): any {
    let formData: FormData = new FormData();
    formData.append('image', file);
    let url = "https://api.imgbb.com/1/upload?key=75e7a3aa56b50a533f2e9946f232fb6a";
    return this.http.post(url, formData);
  }

  variasfuncionessinheadercontenttypesubirimagen( file: File): any {
    let formData: FormData = new FormData();
    formData.append('autor', 'dollarplus');
    formData.append('image', file);
    var url = 'https://equipojotamar.com/backend/public/api/subirimagenescargadasenvariasfunciones';
    return this.http.post(url, formData);
  }


  // ConsultarUsuarioADMIN999() {
  //   this.profileInfo = localStorage.getItem('profileInfo');
  //   if (this.profileInfo) {
  //     // se Cumplio: ProfileInfo existe en el cache
  //     this.profileInfo = this.decrypt(this.profileInfo);
  //     if(this.profileInfo!=undefined&&this.profileInfo!=null&&this.profileInfo!=''){
  //             // se Cumplio: ProfileInfo es diferente a (Vacio, null o indefinido)
  //       this.profileInfo = JSON.parse(this.profileInfo);
  //       if (this.profileInfo && this.profileInfo.id && this.profileInfo.id>1&& this.profileInfo.id<1000000) {
  //         // se Cumplio: ProfileInfo.id existe y es un rango adecuado)
  //         this.datadollarplusappupdateporid = {
  //           nombre_solicitud: 'dollarplusappupdateporid',
  //           id: this.profileInfo.id
  //         }
  //         this.variasfunciones(this.datadollarplusappupdateporid).subscribe(async (res: any) => {
  //           console.log(' respuesta dollarplusappupdateporid In Service ', res);
  //           if(!res&&!res.id&&res.id<1&&res.status!='activo'){
  //             // se Cumplio o NO: que no hay respuesta, el id no vino o estatus no es activo

  //             this.router.navigate(['login']);
  //           }
  //           else{
  //               // se Cumplio: el usuario existe y tiene cuenta activa
  //               localStorage.setItem('profileInfo', this.encrypt(JSON.stringify(res)));
  //               if (res.tipo_cuenta < 998) {
  //                 this.router.navigate(['login']);
  //               }
  //               else {
  //             // se Cumplio: Es Mayor a 998
  //               }
  //           }
  //         });
  //       }
  //       else {
  //         this.router.navigate(['login']);
  //       }


  //     }
  //     else{
  //       this.router.navigate(['login']);
  //     }

  //   }
  //   else {
  //     this.router.navigate(['login']);
  //   }

  //   var url = 'https://equipojotamar.com/backend/public/api/variasfunciones';
  //   return this.http.post(url, this.datadollarplusappupdateporid,
  //     { headers: new HttpHeaders({ "Content-Type": 'application/json' }) });
  // }

  async presentToastAdminNotificacion(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      icon: 'notifications',
      cssClass: 'admin-custom-toast',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }



  async modalerroresdeunoal9(error1,error2,error3,error4,error5,error6,error7,error8,error9) {
    //si alguno de los errores es  diferente a asd se imprime en el modal
    const modal = await this.modalCtrl.create({
      component: ModalconfirmarformularioPage,
      componentProps: {
        cssClass: 'my-custom-classoffv222',
        error1: error1,
        error2: error2,
        error3: error3,
        error4: error4,
        error5: error5,
        error6: error6,
        error7: error7,
        error8: error8,
        error9: error9


      },
      initialBreakpoint: 0.25,
      // backdropBreakpoint: 0.1,
      breakpoints: [0, 0.25, 0.5, 0.75]
    });
    modal.present();
    setTimeout(() => {
      modal.dismiss();
      /*Your Code*/
    }, 3000);

    const { data, role } = await modal.onWillDismiss();

  }



}
