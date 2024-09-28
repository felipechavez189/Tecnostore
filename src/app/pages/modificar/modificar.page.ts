import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  // Variables para almacenar los valores del formulario
  categoria: string = 'Monitores';
  nombre: string = 'Monitor 27\' FHD 240HZ 1MS';
  stock: number = 25;
  precio: number = 191990;

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async guardarCambios() {
    // Validar los campos del formulario
    if (!this.categoria || !this.nombre || this.stock < 0 || this.precio < 0) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos correctamente.',
        duration: 5000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
      return;
    }

    // Muestra el toast de éxito
    const toast = await this.toastController.create({
      message: 'Modificado correctamente',
      duration: 5000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    // Redirige a la página 'crud'
    this.router.navigate(['/crud']);
  }
}

