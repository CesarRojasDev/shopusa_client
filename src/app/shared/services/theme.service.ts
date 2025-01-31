import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private darkModeClass = 'dark';
  private storageKey = 'darkMode';

  constructor() {
    this.loadThemePreference();
  }

  private loadThemePreference(): void {
    // Cargar el estado guardado del modo oscuro desde LocalStorage
    const savedPreference = localStorage.getItem(this.storageKey);
    if (savedPreference === 'true') {
      this.enableDarkMode();
    } else if (savedPreference === 'false') {
      this.disableDarkMode();
    } else {
      // Si no hay preferencia guardada, verificar el sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        this.enableDarkMode();
      }
    }
  }

  enableDarkMode(): void {
    document.documentElement.classList.add(this.darkModeClass);
    localStorage.setItem(this.storageKey, 'true'); // Guardar preferencia
  }

  disableDarkMode(): void {
    document.documentElement.classList.remove(this.darkModeClass);
    localStorage.setItem(this.storageKey, 'false'); // Guardar preferencia
  }

  toggleDarkMode(): void {
    const isEnabled = document.documentElement.classList.toggle(this.darkModeClass);
    localStorage.setItem(this.storageKey, isEnabled.toString()); // Actualizar preferencia
  }

  isDarkModeEnabled(): boolean {
    return document.documentElement.classList.contains(this.darkModeClass);
  }
}
