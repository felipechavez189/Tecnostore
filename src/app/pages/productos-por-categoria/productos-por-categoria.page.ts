import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/services/producto';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-productos-por-categoria',
  templateUrl: './productos-por-categoria.page.html',
  styleUrls: ['./productos-por-categoria.page.scss'],
})
export class ProductosPorCategoriaPage implements OnInit {

  productos: Producto[] = [];

  constructor(private bd: ServiceBDService) {}

  ngOnInit() {
    this.bd.fetchProductoPorCategoria().subscribe(data => {
      this.productos = data;
    });
  }

}
