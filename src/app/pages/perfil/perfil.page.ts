import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamaraService } from 'src/app/services/camara.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  rut: string = '';
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  nombreUsuario: string = '';
  photoUrl: string = '/assets/icon/perfil.jpg'; // Imagen por defecto
  idUsuario: number = 0; // ID del usuario para eliminar

  constructor(
    private route: ActivatedRoute,
    private camaraService: CamaraService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private storage: NativeStorage,
    private alertController: AlertController,
    private bdService: ServiceBDService // Servicio de BD para eliminar usuario
  ) {}

  ngOnInit() {
    // Recuperar los datos almacenados en localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.rut = userData.rut;
      this.nombre = userData.nombre;
      this.apellido = userData.apellido;
      this.email = userData.correo;
      this.nombreUsuario = userData.nombreUsuario;
      this.idUsuario = userData.id_usu; // Almacenar el ID del usuario
    }
  }

  async selectImageOrTakePhoto() {
    const action = await this.showActionSheet();
    if (action === 'camera') {
      await this.takePhoto();
    } else if (action === 'gallery') {
      await this.selectImage();
    } else if (action === 'delete') {
      this.deletePhoto();
    }
  }

  async showActionSheet() {
    let selectedAction = '';

    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            selectedAction = 'camera';
            return true;
          },
        },
        {
          text: 'Elegir de la Galería',
          handler: () => {
            selectedAction = 'gallery';
            return true;
          },
        },
        {
          text: 'Eliminar Foto',
          handler: () => {
            selectedAction = 'delete';
            return true;
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
    await actionSheet.onDidDismiss();

    return selectedAction;
  }

  async takePhoto() {
    try {
      const photoBlob = await this.camaraService.takePhoto();
      this.photoUrl = URL.createObjectURL(photoBlob);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async selectImage() {
    try {
      const imageBlob = await this.camaraService.pickImage();
      this.photoUrl = URL.createObjectURL(imageBlob);
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  async cerrarSesion() {
    await this.storage.remove('Usuario_logueado');
    this.router.navigate(['/login']);
  }

  deletePhoto() {
    this.photoUrl = '/assets/icon/perfil.jpg'; // Restablecer imagen por defecto
  }

  async eliminarPerfil() {
    const alert = await this.alertController.create({
      header: 'Eliminar Perfil',
      message: '¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.bdService.eliminarUsuario(this.idUsuario.toString());
              await this.storage.remove('Usuario_logueado');
              localStorage.removeItem('userData');
              this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error al eliminar el perfil:', error);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
