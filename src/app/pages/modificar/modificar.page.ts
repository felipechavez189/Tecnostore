import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async guardarCambios() {
    // Muestra el toast
    const toast = await this.toastController.create({
      message: 'Modificado correctamente',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();

    // Redirige a la página 'crud'
    this.router.navigate(['/crud']);
  }
}
