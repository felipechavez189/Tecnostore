import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { ServiceBDService } from 'src/app/services/service-bd.service'; // Ajusta la ruta al servicio donde tienes tus métodos

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  productos: any[] = []; // Arreglo para almacenar los productos

  constructor(private alertController: AlertController, private serviceBD: ServiceBDService) { }

  ngOnInit() {
    this.cargarProductos(); // Cargar productos al inicializar
  }

  // Función para obtener todos los productos
  cargarProductos() {
    this.serviceBD.obtenerTodosLosProductos().then((productos) => {
      this.productos = productos;
    }).catch((error) => {
      console.error('Error al cargar los productos:', error);
    });
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
