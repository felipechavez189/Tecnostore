import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importar el servicio Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  contrasena: string = '';
  validarContrasena: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router  // Inyectar el Router en el constructor
  ) { }

  ngOnInit() { }

  async crearCuenta() {
    // Validación de campos vacíos
    if (this.nombre === '' || this.apellido === '' || this.correo === '' || this.telefono === '' || this.contrasena === '' || this.validarContrasena === '') {
      await this.presentAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    // Validación de la contraseña
    const contrasenaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!contrasenaRegex.test(this.contrasena)) {
      await this.presentAlert('Error', 'La contraseña debe tener un mínimo de 6 caracteres, una mayúscula, un número y un carácter especial.');
      return;
    }

    // Validación de coincidencia de contraseñas
    if (this.contrasena !== this.validarContrasena) {
      await this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Si todo es válido, mostrar un mensaje de éxito y redirigir al login
    await this.presentAlert('Éxito', 'Cuenta creada con éxito.');
    this.router.navigate(['/login']);  // Redirigir al login
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
