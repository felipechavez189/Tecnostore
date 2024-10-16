import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBDService } from '../../services/service-bd.service'; // Asegúrate de que esté bien importado
import { CamaraService } from '../../services/camara.service'; // Servicio de la cámara

@Component({
  selector: 'app-agregar-audifono',
  templateUrl: './agregar-audifono.page.html',
  styleUrls: ['./agregar-audifono.page.scss'],
})
export class AgregarAudifonoPage {
  audifono = {
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
      this.audifono.imagen = await this.camaraService.takePhoto(); // Captura la imagen como Blob
      console.log('Imagen capturada como Blob:', this.audifono.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }

  // Método para seleccionar una imagen desde la galería y guardarla como Blob
  async seleccionarImagen() {
    try {
      this.audifono.imagen = await this.camaraService.pickImage(); // Selecciona la imagen como Blob
      console.log('Imagen seleccionada como Blob:', this.audifono.imagen); // Verifica que el Blob es correcto
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  // Método para agregar el audífono con la imagen como Blob
  agregarAudifono() {
    const categoriaId = 3; // Asumiendo que 3 es la categoría para Audífonos

    if (!this.audifono.imagen) {
      console.error('Error: La imagen no está definida.');
      return; // No continúes si no hay una imagen
    }

    this.serviceBDService.agregarProducto(
      this.audifono.nombre,
      this.audifono.precio,
      this.audifono.stock,
      this.audifono.descripcion,
      this.audifono.imagen, // Pasamos el Blob de la imagen
      categoriaId
    ).then(() => {
      this.router.navigateByUrl('/audifonos'); // Redirige a la lista de audífonos después de agregar
    }).catch(error => {
      console.error('Error al agregar el audífono:', error);
    });
  }
}
