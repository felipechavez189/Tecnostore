import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-crudteclados',
  templateUrl: './crudteclados.page.html',
  styleUrls: ['./crudteclados.page.scss'],
})
export class CrudtecladosPage implements OnInit {
  productosFiltrados: any[] = []; // Arreglo para almacenar solo teclados

  constructor(private alertController: AlertController, private serviceBD: ServiceBDService) { }

  ngOnInit() {
    this.cargarProductos(); // Cargar productos al inicializar
  }

  cargarProductos() {
    this.serviceBD.obtenerProductosTeclados().then((productos: any[]) => {
      this.productosFiltrados = productos; // Almacena solo teclados en el arreglo filtrado
    }).catch((error) => {
      console.error('Error al cargar los productos:', error);
    });
  }
}
