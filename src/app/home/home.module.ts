import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';  // Importar rutas de HomePage

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,  // Asegura la compatibilidad con directivas básicas de Angular
    FormsModule,  // Para usar ngModel en el HTML
    IonicModule,  // Componentes de Ionic
    HomePageRoutingModule  // Enrutamiento específico de la página
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
