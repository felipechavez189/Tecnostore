import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBDService } from '../../services/service-bd.service'; // Asegúrate de que esté bien importado
import { CamaraService } from '../../services/camara.service'; // Servicio de la cámara

@Component({
  selector: 'app-agregar-mouse',
  templateUrl: './agregar-mouse.page.html',
  styleUrls: ['./agregar-mouse.page.scss'],
})
export class AgregarMousePage {
  mouse = {
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
      this.mouse.imagen = await this.camaraService.takePhoto(); // Captura la imagen como Blob
      console.log('Imagen capturada como Blob:', this.mouse.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

  // Método para seleccionar una imagen desde la galería y guardarla como Blob
  async seleccionarImagen() {
    try {
      this.mouse.imagen = await this.camaraService.pickImage(); // Selecciona la imagen como Blob
      console.log('Imagen seleccionada como Blob:', this.mouse.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  // Método para agregar el mouse con la imagen como Blob
  agregarMouse() {
    const categoriaId = 4; // Asumiendo que 4 es la categoría para Mouse

    if (!this.mouse.imagen) {
      console.error('Error: La imagen no está definida.');
      return; // No continúes si no hay una imagen
    }

    this.serviceBDService.agregarProducto(
      this.mouse.nombre,
      this.mouse.precio,
      this.mouse.stock,
      this.mouse.descripcion,
      this.mouse.imagen, // Pasamos el Blob de la imagen
      categoriaId
    ).then(() => {
      this.router.navigateByUrl('/mouse'); // Redirige a la lista de mouse después de agregar
    }).catch(error => {
      console.error('Error al agregar el mouse:', error);
    });
  }
}
