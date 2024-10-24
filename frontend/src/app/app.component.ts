import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isDarkMode: boolean = false; // Para enlazar el estado del toggle

  constructor(
    
  ) {
    this.initializeApp();

  }

  initializeApp() {
    // Verificar si el sistema prefiere modo oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Sincronizar el estado del toggle con la preferencia del sistema
    this.isDarkMode = prefersDark.matches;
    this.applyDarkMode(this.isDarkMode);

    // Escuchar cambios en la preferencia del sistema
    prefersDark.addEventListener('change', (mediaQuery) => {
      this.isDarkMode = mediaQuery.matches;
      this.applyDarkMode(this.isDarkMode);
    });
  }

  toggleDarkMode(event: any) {
    // Verifica directamente si el toggle está activado
    const isChecked = event.detail.checked;

    // Aplicar el modo oscuro o claro según el estado del toggle
    this.applyDarkMode(isChecked);
  }

  applyDarkMode(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }


}
