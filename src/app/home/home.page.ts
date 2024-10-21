import { Component, OnInit } from '@angular/core';
import { ServiceBDService } from '../services/service-bd.service';  // Asegúrate de la ruta correcta

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(private bdService: ServiceBDService) {}

  async ngOnInit() {
    await this.cargarProductos();
  }

  async cargarProductos() {
    try {
      this.productos = await this.bdService.obtenerTodosLosProductos();
      console.log('Productos cargados:', this.productos);  // Verificar los productos
      this.productosFiltrados = [...this.productos];
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  filtrarProductos(event: any) {
    const texto = event.target.value.toLowerCase();
    this.productosFiltrados = texto
      ? this.productos.filter(producto =>
          producto.nombre_prod.toLowerCase().includes(texto)
        )
      : [...this.productos];
  }
}
