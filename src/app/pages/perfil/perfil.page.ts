import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamaraService } from 'src/app/services/camara.service';
import { ActionSheetController } from '@ionic/angular';

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
  photoUrl: string = '/assets/icon/perfil.jpg'; // Imagen por defecto

  constructor(
    private route: ActivatedRoute,
    private camaraService: CamaraService,
    private actionSheetController: ActionSheetController
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

  deletePhoto() {
    this.photoUrl = '/assets/icon/perfil.jpg'; // Restablecer imagen por defecto
  }
}
