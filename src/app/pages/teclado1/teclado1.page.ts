import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; 
import { ServiceBDService } from 'src/app/services/service-bd.service'; 
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'; 

@Component({
  selector: 'app-teclado1',
  templateUrl: './teclado1.page.html',
  styleUrls: ['./teclado1.page.scss'],
})
export class Teclado1Page implements OnInit {
  idusuario!: number; // Usuario logueado
  idProducto: number = 5; // ID del teclado (ajustar según tu base de datos)
  cantidad: number = 1; // Cantidad inicial

  constructor(
    private toastController: ToastController,
    private dbService: ServiceBDService,
    private storage: NativeStorage
  ) {}

  async ngOnInit() {
    await this.obtenerUsuario(); // Obtener el usuario logueado
  }

  // Obtener el usuario logueado desde NativeStorage
  async obtenerUsuario() {
    try {
      this.idusuario = await this.storage.getItem('Usuario_logueado');
      console.log('Usuario logueado:', this.idusuario);
    } catch (error) {
      console.error('Error al obtener usuario logueado:', error);
    }
  }

  // Agregar el teclado al carrito
  async agregarAlCarrito() {
    try {
      await this.dbService.agregarACarrito(this.idusuario, this.idProducto, this.cantidad);
      this.mostrarAlertaCarrito(); // Mostrar el toast de confirmación
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  }

  // Mostrar mensaje de confirmación (toast)
  async mostrarAlertaCarrito() {
    const toast = await this.toastController.create({
      message: 'Teclado añadido al carrito.',
      duration: 5000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }
}
