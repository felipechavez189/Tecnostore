import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  profile = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  async camposVacios() {
    // Validar que todos los campos estén llenos
    if (!this.profile.name || !this.profile.email || !this.profile.phone || !this.profile.address) {
      const alert = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    // Mostrar toast de éxito
    const toast = await this.toastController.create({
      message: 'Cambios realizados',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();

    // Redirigir a la página de perfil
    this.router.navigate(['/perfil']);
  }
}
