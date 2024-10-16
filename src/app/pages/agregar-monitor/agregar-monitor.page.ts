import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBDService } from '../../services/service-bd.service';
import { CamaraService } from '../../services/camara.service'; // Servicio de la cámara

@Component({
  selector: 'app-agregar-monitor',
  templateUrl: './agregar-monitor.page.html',
  styleUrls: ['./agregar-monitor.page.scss'],
})
export class AgregarMonitorPage {
  monitor = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: null as Blob | null // Aquí guardaremos el Blob de la imagen
  };

  constructor(
    private serviceBDService: ServiceBDService,
    private camaraService: CamaraService, // Servicio para manejar la cámara
    private router: Router
  ) {}

  // Método para capturar una foto con la cámara y guardarla como Blob
  async capturarFoto() {
    try {
      this.monitor.imagen = await this.camaraService.takePhoto(); // Captura la imagen como Blob
      console.log('Imagen capturada como Blob:', this.monitor.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

  // Método para seleccionar una imagen desde la galería y guardarla como Blob
  async seleccionarImagen() {
    try {
      this.monitor.imagen = await this.camaraService.pickImage(); // Selecciona la imagen como Blob
      console.log('Imagen seleccionada como Blob:', this.monitor.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  agregarMonitor() {
    const categoriaId = 2; // Asumiendo que 2 es la ID de la categoría para Monitores

    if (!this.monitor.imagen) {
      console.error('Error: La imagen no está definida.');
      return; // No continúes si no hay una imagen
    }

    this.serviceBDService.agregarProducto(
      this.monitor.nombre,
      this.monitor.precio,
      this.monitor.stock,
      this.monitor.descripcion,
      this.monitor.imagen, // Pasamos el Blob de la imagen
      categoriaId
    ).then(() => {
      this.router.navigateByUrl('/monitores'); // Redirige a la lista de monitores después de agregar
    }).catch(error => {
      console.error('Error al agregar el monitor:', error);
    });
  }
}
