import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ''; 
  password: string = '';

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() { }

  async onLogin() {
    if (this.email === 'usuario@example.com' && this.password === 'usuario123') {
      this.router.navigate(['/home']);
      await this.presentToast('Inicio de sesión exitoso');
    } else {
      await this.presentAlert('Usuario o contraseña incorrectas');
    }
  }

  async inLogin() {
    if (this.email === 'admin@example.com' && this.password === 'admin123') {
      this.router.navigate(['/home']);
      await this.presentToast('Inicio de sesión exitoso como admin');
    } else {
      await this.presentAlert('Usuario o contraseña incorrectas');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  
      position: 'bottom'  
    });

    toast.present();
  }

  irPagina() {
    this.router.navigate(['/signup']);
  }
}
