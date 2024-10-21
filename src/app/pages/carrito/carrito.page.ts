import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { Carritos } from 'src/app/services/carritos';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  idusuario! :number
  carrito: Carritos[]=[]
  constructor(private router: Router, private toastController: ToastController, private dbService : ServiceBDService, private storage :NativeStorage) { }

  ngOnInit() {
    this.obtenerUsuario()
    if(this.idusuario){
      this.dbService.selectCarrito(this.idusuario)
      this.dbService.fetchCarrito().subscribe(data=>{
        this.carrito = data
      })
    }else{
      console.log('No hay usuario detectado')
    }
  }

  async pagar() {
    // Mostrar el toast
    const toast = await this.toastController.create({
      message: 'Compra realizada',
      duration: 5000, // Duración en milisegundos
      position: 'bottom'
    });
    await toast.present();

    // Redirigir al home después de mostrar el toast
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000); // Debe ser igual o mayor a la duración del toast
  }


  async obtenerUsuario(){
    this.idusuario = await this.storage.getItem('Usuario_logueado')
  }
}
