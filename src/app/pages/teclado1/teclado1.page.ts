import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; // Importa el ToastController

@Component({
  selector: 'app-teclado1',
  templateUrl: './teclado1.page.html',
  styleUrls: ['./teclado1.page.scss'],
})
export class Teclado1Page implements OnInit {

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
