import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  rut: string = '';
  nombre: string = '';
  apellido: string = '';
  nombreUsuario: string = '';
  correo: string = '';
  contrasena: string = '';
  validarContrasena: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private dbService: ServiceBDService  // Inyectar el servicio ServiceBDService
  ) { }

  ngOnInit() { }

  async crearCuenta() {
    // Validación de campos vacíos
    if (this.rut === '' || this.nombre === '' || this.apellido === '' || this.nombreUsuario === '' || this.correo === '' || this.contrasena === '' || this.validarContrasena === '') {
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

    // Insertar el usuario en la base de datos
    this.dbService.insertarUsuario(this.rut, this.nombre, this.apellido, this.nombreUsuario, this.contrasena, this.correo, 'activo', 2)
      .then(async () => {
        // Almacenar datos del usuario en localStorage
        localStorage.setItem('userData', JSON.stringify({
          rut: this.rut,
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          nombreUsuario: this.nombreUsuario
        }));

        await this.presentAlert('Éxito', 'Cuenta creada con éxito.');
        this.router.navigate(['/login']);  // Redirigir al perfil
      })
      .catch(async (error) => {
        await this.presentAlert('Error', 'Hubo un problema al crear la cuenta.');
      });
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
