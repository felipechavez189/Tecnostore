import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service'; // Asegúrate de importar tu servicio correctamente

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ''; 
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private dbService: ServiceBDService, // Inyectar el servicio de base de datos
    private storage : NativeStorage
  ) { }

  ngOnInit() { }

  async onLogin() {
    // Validación del correo
    if (!this.validarCorreo(this.email)) {
      await this.presentAlert('El correo debe contener un único @.');
      return;
    }

    // Validación de la contraseña
    if (!this.validarContrasena(this.password)) {
      await this.presentAlert('La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial.');
      return;
    }

    // Verificar las credenciales en la base de datos
   this.dbService.validarUsuario(this.email,this.password).then(usuario=>{
    if(usuario){

      let navigationExtras: NavigationExtras = {
        queryParams: {
          email: this.email
        }
      };

      const idUsuario = usuario.id_usu
      
      this.guardarIdUsuario(idUsuario)

      this.router.navigate(['/perfil'], navigationExtras);  // Navegación con extras
      this.presentToast('Inicio de sesión exitoso');

    }else{
      this.presentAlert('Usuario o contraseña incorrectas');
    }
   })
  }

  async guardarIdUsuario(idUsuario : number){
    try{
      await this.storage.setItem('Usuario_logueado',idUsuario)
    }catch(e){
      console.log('Error al guardar el id de usuario'+JSON.stringify(e))
    }
  }
 


  validarCorreo(email: string): boolean {
    // Verifica que haya solo un @ en el correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const atSymbolCount = email.split('@').length - 1;
    return emailPattern.test(email) && atSymbolCount === 1;
  }

  validarContrasena(password: string): boolean {
    // Este patrón verifica que la contraseña tenga al menos 6 caracteres, una mayúscula, un número y un carácter especial
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordPattern.test(password);
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
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

  irPagina() {
    this.router.navigate(['/signup']);
  }
}
