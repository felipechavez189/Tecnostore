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
  photoUrl: string = '/assets/icon/perfil.jpg'; // Imagen por defecto

  constructor(
    private route: ActivatedRoute,
    private camaraService: CamaraService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
  }

  // Método para seleccionar imagen, tomar foto o eliminar la actual
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

  // Muestra las opciones en un ActionSheet
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

  // Método para tomar una foto y convertirla a URL
  async takePhoto() {
    try {
      const photoBlob = await this.camaraService.takePhoto(); // Foto como Blob
      this.photoUrl = URL.createObjectURL(photoBlob); // Convertir Blob a URL
      console.log('Foto tomada:', this.photoUrl);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  // Método para seleccionar una imagen de la galería y convertirla a URL
  async selectImage() {
    try {
      const imageBlob = await this.camaraService.pickImage(); // Imagen como Blob
      this.photoUrl = URL.createObjectURL(imageBlob); // Convertir Blob a URL
      console.log('Imagen seleccionada:', this.photoUrl);
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  // Método para eliminar la foto y volver a la imagen por defecto
  deletePhoto() {
    this.photoUrl = '/assets/icon/perfil.jpg'; // Restablecer imagen por defecto
  }
}
