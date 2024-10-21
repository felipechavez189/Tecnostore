import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Producto } from 'src/app/services/producto';
import { ServiceBDService } from 'src/app/services/service-bd.service';


@Component({
  selector: 'app-crudteclados',
  templateUrl: './crudteclados.page.html',
  styleUrls: ['./crudteclados.page.scss'],
})
export class CrudtecladosPage implements OnInit {

  teclados: Producto[] = []; // Arreglo para almacenar los teclados
  tecladosFiltrados: Producto[] = []; // Arreglo para almacenar los teclados filtrados

  constructor(private alertController: AlertController, private serviceBD: ServiceBDService) { }

  ngOnInit() {
    this.cargarTeclados(); // Cargar teclados al inicializar
  }

  cargarTeclados() {
    this.serviceBD.seleccionarTeclados().then(teclados => {
      this.teclados = teclados; // Asignar teclados al arreglo principal
      this.tecladosFiltrados = teclados; // Mostrar todos los teclados inicialmente
    }).catch(error => {
      console.error('Error al cargar teclados:', error);
    });

    // Suscribirse al listadoTeclados para recibir actualizaciones
    this.serviceBD.listadoTeclados.subscribe(teclados => {
      this.teclados = teclados; // Actualiza el arreglo de teclados
      this.tecladosFiltrados = teclados; // Actualiza también los teclados filtrados
    });
  }

  

}




















