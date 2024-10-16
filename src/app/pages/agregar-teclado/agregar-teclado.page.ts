import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBDService } from '../../services/service-bd.service'; // Asegúrate de que esté bien importado
import { CamaraService } from '../../services/camara.service'; // Servicio de la cámara

@Component({
  selector: 'app-agregar-teclado',
  templateUrl: './agregar-teclado.page.html',
  styleUrls: ['./agregar-teclado.page.scss'],
})
export class AgregarTecladoPage {
  teclado = {
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
      this.teclado.imagen = await this.camaraService.takePhoto(); // Captura la imagen como Blob
      console.log('Imagen capturada como Blob:', this.teclado.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

  // Método para seleccionar una imagen desde la galería y guardarla como Blob
  async seleccionarImagen() {
    try {
      this.teclado.imagen = await this.camaraService.pickImage(); // Selecciona la imagen como Blob
      console.log('Imagen seleccionada como Blob:', this.teclado.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  // Método para agregar el teclado con la imagen como Blob
  agregarTeclado() {
    const categoriaId = 2; // Asumiendo que 2 es la categoría para Teclados

    if (!this.teclado.imagen) {
      console.error('Error: La imagen no está definida.');
      return; // No continúes si no hay una imagen
    }

    this.serviceBDService.agregarProducto(
      this.teclado.nombre,
      this.teclado.precio,
      this.teclado.stock,
      this.teclado.descripcion,
      this.teclado.imagen, // Pasamos el Blob de la imagen
      categoriaId
    ).then(() => {
      this.router.navigateByUrl('/teclados'); // Redirige a la lista de teclados después de agregar
    }).catch(error => {
      console.error('Error al agregar el teclado:', error);
    });
  }
}
