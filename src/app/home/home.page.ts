import { Component, OnInit } from '@angular/core';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string = ''; // Texto ingresado en la barra de búsqueda

  productos: Array<{ 
    nombre: string; 
    precio: number; 
    stock: number; 
    descripcion: string; 
    imagen: string | null; 
    categoria: number; 
    id: number 
  }> = [
    // Teclados
    { nombre: 'Teclado Mecánico Gamer Redragon Kumara K552', precio: 34990, stock: 15, descripcion: 'Teclado compacto con switches mecánicos y retroiluminación.', imagen: null, categoria: 1, id: 1 },
    { nombre: 'Teclado Gamer G413 Carbon - Logitech', precio: 8990, stock: 20, descripcion: 'Teclado con switches Romer-G y diseño elegante.', imagen: null, categoria: 1, id: 2 },
    { nombre: 'Teclado Gamer Xtech Arminger XTK-510S', precio: 13990, stock: 20, descripcion: 'Teclado asequible con estilo RGB y controles multimedia.', imagen: null, categoria: 1, id: 3 },
    { nombre: 'Teclado Gamer XPG Mage RGB Gaming Red Switch', precio: 12990, stock: 20, descripcion: 'Teclado compacto con switches Red y RGB personalizable.', imagen: null, categoria: 1, id: 4 },
    { nombre: 'Teclado Gamer HP GK100 - QWERTY Español - ProGaming', precio: 10990, stock: 30, descripcion: 'Teclado con diseño ergonómico y luz RGB llamativa.', imagen: null, categoria: 1, id: 5 },
    { nombre: 'Teclado Mecánico con Retroiluminación', precio: 18990, stock: 25, descripcion: 'Teclado con retroiluminación LED o RGB y switches duraderos.', imagen: null, categoria: 1, id: 6 },

    // Monitores
    { nombre: 'Monitor 27 FHD 240HZ 1MS', precio: 191990, stock: 15, descripcion: 'Monitor de 27 pulgadas con 240 Hz y 1 ms de respuesta.', imagen: null, categoria: 2, id: 7 },
    { nombre: 'Monitor Gamer Samsung Odyssey G3 S27ag32 LCD 27 Negro', precio: 178990, stock: 15, descripcion: 'Monitor de 27 pulgadas con 165 Hz y soporte FreeSync.', imagen: null, categoria: 2, id: 8 },
    { nombre: 'Monitor Gaming AOC C27g2z 27 240hz 0.5ms', precio: 219990, stock: 12, descripcion: 'Monitor curvo de alto rendimiento para gamers.', imagen: null, categoria: 2, id: 9 },
    { nombre: 'Monitor Gamer LED 24 Full HD 180hz 1ms', precio: 129990, stock: 20, descripcion: 'Monitor con Full HD y 180 Hz a 1 ms.', imagen: null, categoria: 2, id: 10 },
    { nombre: 'Monitor Gamer Curvo Kolke 31.5 Full HD 165hz 1ms Freesync', precio: 130990, stock: 20, descripcion: 'Monitor curvo de 31.5 pulgadas con FreeSync.', imagen: null, categoria: 2, id: 11 },
    { nombre: 'Monitor Gamer Kolke 27 IPS Ejecutivo 100hz 1ms Freesync', precio: 100990, stock: 15, descripcion: 'Monitor de 27 pulgadas con panel IPS y FreeSync.', imagen: null, categoria: 2, id: 12 },

    // Audífonos
    { nombre: 'Audífonos Gamer Profesional E1000 USB RGB 7.1 PC', precio: 16990, stock: 20, descripcion: 'Audífonos gamer con sonido envolvente 7.1.', imagen: null, categoria: 3, id: 13 },
    { nombre: 'Audífono Gamer Logitech G535', precio: 79990, stock: 10, descripcion: 'Audífono ligero y cómodo.', imagen: null, categoria: 3, id: 14 },
    { nombre: 'Audífonos Gamer A10', precio: 21990, stock: 15, descripcion: 'Audífonos con sonido claro y potente.', imagen: null, categoria: 3, id: 15 },
    { nombre: 'Audífonos Gamer Onikuma K20 Camuflaje Blanco con Luz RGB LED', precio: 8990, stock: 30, descripcion: 'Audífonos con diseño camuflaje y RGB.', imagen: null, categoria: 3, id: 16 },
    { nombre: 'Auriculares Inalámbricos para PC', precio: 28990, stock: 18, descripcion: 'Auriculares inalámbricos con batería duradera.', imagen: null, categoria: 3, id: 17 },
    { nombre: 'Audífonos Gamer Logitech G335, Wired, Auricular Tamaño Completo', precio: 59990, stock: 23, descripcion: 'Auriculares con cable y ligeros.', imagen: null, categoria: 3, id: 18 },

    // Mouses
    { nombre: 'Mouse Gamer Redragon Vampire M720', precio: 19900, stock: 15, descripcion: 'Mouse ergonómico y preciso.', imagen: null, categoria: 4, id: 19 },
    { nombre: 'Mouse Gamer Logitech G203 RGB LIGHTSYNC', precio: 20990, stock: 25, descripcion: 'Mouse con diseño clásico y sensor de 8000 DPI.', imagen: null, categoria: 4, id: 20 },
    { nombre: 'Mouse Gamer Logitech G203 New RGB LIGHTSYNC White', precio: 23450, stock: 10, descripcion: 'Mouse en color blanco con luces RGB.', imagen: null, categoria: 4, id: 21 },
    { nombre: 'Logitech G Ratón Inalámbrico Lightspeed - Azul', precio: 29990, stock: 15, descripcion: 'Ratón inalámbrico con conexión rápida.', imagen: null, categoria: 4, id: 22 },
    { nombre: 'Mouse Gamer Monster Thunderstorm', precio: 7990, stock: 30, descripcion: 'Mouse con diseño llamativo y sensor preciso.', imagen: null, categoria: 4, id: 23 },
    { nombre: 'Mouse Gamer Hourglass Óptico RGB USB Negro', precio: 13990, stock: 20, descripcion: 'Mouse ergonómico con RGB.', imagen: null, categoria: 4, id: 24 },

    // Sillas
    { nombre: 'Silla Gamer Wetech Color Gris/Negro Modelo LS-1118', precio: 81290, stock: 5, descripcion: 'Silla moderna en gris y negro.', imagen: null, categoria: 5, id: 19 },
    { nombre: 'Silla Gamer Reclinable B/N', precio: 77000, stock: 10, descripcion: 'Silla con soporte lumbar ajustable.', imagen: null, categoria: 5, id: 20 },
    { nombre: 'Silla Gamer Lumax ROM', precio: 69990, stock: 15, descripcion: 'Silla con reposabrazos ajustables.', imagen: null, categoria: 5, id: 21 },
    { nombre: 'Silla Gamer Racing Reclinable 180° Reposapiés Rojo', precio: 63490, stock: 15, descripcion: 'Silla racing con reposapiés.', imagen: null, categoria: 5, id: 22 },
    { nombre: 'Silla Gamer Ergonómica Kingshouse Con Apoyapiés Azul', precio: 62990, stock: 20, descripcion: 'Silla ergonómica con apoyapiés.', imagen: null, categoria: 5, id: 23 },
    { nombre: 'Silla Gamer Semi Profesional Con Reposa Pies', precio: 68990, stock: 10, descripcion: 'Silla con reposapiés ajustable.', imagen: null, categoria: 5, id: 24 },


    // PCs
    { nombre: 'PC Gamer Vibora Black V1', precio: 389990, stock: 8, descripcion: 'PC con Intel Core i3 y GTX 1050 Ti.', imagen: null, categoria: 6, id: 25 },
    { nombre: 'PC Gamer AMD Ryzen 5 5500', precio: 789990, stock: 2, descripcion: 'PC con Ryzen 5 5500 y RTX 3060.', imagen: null, categoria: 6, id: 26 },
    { nombre: 'PC Gamer AMD Ryzen 5 5600G', precio: 749990, stock: 5, descripcion: 'PC con Ryzen 5 5600G y gráficos Vega.', imagen: null, categoria: 6, id: 27 },
    { nombre: 'PC Gamer Spartan Rz 3 2200G Pro', precio: 344990, stock: 7, descripcion: 'PC con Ryzen 3 2200G y Vega 8.', imagen: null, categoria: 6, id: 28 },
    { nombre: 'PC Gamer Intel i5 11400F', precio: 849000, stock: 2, descripcion: 'PC con i5 11400F y RTX 3060 Ti.', imagen: null, categoria: 6, id: 29 }
  ];

  productosFiltrados: Array<{ 
    nombre: string; 
    precio: number; 
    stock: number; 
    descripcion: string; 
    imagen: string | null; 
    categoria: number; 
    id: number 
  }> = [];

  constructor(private bd: ServiceBDService) {}

  ngOnInit() {
    this.productosFiltrados = [...this.productos];
  }

  filtrarProductos(event: any) {
    const texto = event.target.value.toLowerCase();
    this.productosFiltrados = texto
      ? this.productos.filter(producto => producto.nombre.toLowerCase().includes(texto))
      : [...this.productos];
  }
}
