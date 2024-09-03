import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async pagar() {
    // Mostrar el toast
    const toast = await this.toastController.create({
      message: 'Compra realizada',
      duration: 2000, // Duración en milisegundos
      position: 'bottom'
    });
    await toast.present();

    // Redirigir al home después de mostrar el toast
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000); // Debe ser igual o mayor a la duración del toast
  }

}
