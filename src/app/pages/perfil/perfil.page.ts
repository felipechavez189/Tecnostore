import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamaraService } from '../../services/camara.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  email: string = '';
  photoUrl: string = '/assets/icon/perfil.jpg'; // URL por defecto de la imagen de perfil

  constructor(
    private route: ActivatedRoute,
    private camaraService: CamaraService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
  }

  // Método para seleccionar imagen, tomar foto o eliminar la actual
  async selectImageOrTakePhoto() {
    const action = await this.showActionSheet();
    if (action === 'camera') {
      this.takePhoto();
    } else if (action === 'gallery') {
      this.selectImage();
    } else if (action === 'delete') {
      this.deletePhoto();
    }
  }

  // ActionSheet con opciones para tomar foto, elegir de la galería o eliminar la foto
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

  // Método para tomar una foto
  async takePhoto() {
    try {
      this.photoUrl = await this.camaraService.takePhoto();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  // Método para seleccionar una imagen de la galería
  async selectImage() {
    try {
      this.photoUrl = await this.camaraService.pickImage();
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  // Método para eliminar la foto y volver a la imagen por defecto
  deletePhoto() {
    this.photoUrl = '/assets/icon/perfil.jpg'; // Restablece la imagen de perfil por defecto
  }
}
