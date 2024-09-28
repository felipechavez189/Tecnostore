import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; // Importa el ToastController

@Component({
  selector: 'app-audifonos1',
  templateUrl: './audifonos1.page.html',
  styleUrls: ['./audifonos1.page.scss'],
})
export class Audifonos1Page implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  async alarmaCarrito() {
    const toast = await this.toastController.create({
      message: 'Se añadió al carrito.',
      duration: 5000, // Duración en milisegundos
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }
}
