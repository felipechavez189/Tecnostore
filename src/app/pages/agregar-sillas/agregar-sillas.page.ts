import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBDService } from '../../services/service-bd.service'; // Asegúrate de que esté bien importado
import { CamaraService } from '../../services/camara.service'; // Servicio de la cámara

@Component({
  selector: 'app-agregar-silla',
  templateUrl: './agregar-silla.page.html',
  styleUrls: ['./agregar-silla.page.scss'],
})
export class AgregarSillaPage {
  silla = {
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
      this.silla.imagen = await this.camaraService.takePhoto(); // Captura la imagen como Blob
      console.log('Imagen capturada como Blob:', this.silla.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

  // Método para seleccionar una imagen desde la galería y guardarla como Blob
  async seleccionarImagen() {
    try {
      this.silla.imagen = await this.camaraService.pickImage(); // Selecciona la imagen como Blob
      console.log('Imagen seleccionada como Blob:', this.silla.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  // Método para agregar la silla con la imagen como Blob
  agregarSilla() {
    const categoriaId = 5; // Asumiendo que 5 es la categoría para Sillas

    if (!this.silla.imagen) {
      console.error('Error: La imagen no está definida.');
      return; // No continúes si no hay una imagen
    }

    this.serviceBDService.agregarProducto(
      this.silla.nombre,
      this.silla.precio,
      this.silla.stock,
      this.silla.descripcion,
      this.silla.imagen, // Pasamos el Blob de la imagen
      categoriaId
    ).then(() => {
      this.router.navigateByUrl('/sillas'); // Redirige a la lista de sillas después de agregar
    }).catch(error => {
      console.error('Error al agregar la silla:', error);
    });
  }
}
