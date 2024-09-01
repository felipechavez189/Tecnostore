import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  constructor(private alertController: AlertController) { } // Inyecta AlertController

  ngOnInit() {
  }

  // Función para mostrar la alerta
  async EliminarAlerta() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
        }
      ]
    });

    await alert.present();
  }

}
