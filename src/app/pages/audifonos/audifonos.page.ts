import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audifonos',
  templateUrl: './audifonos.page.html',
  styleUrls: ['./audifonos.page.scss'],
})
export class AudifonosPage implements OnInit {

  Audifonos = [
    {
      nombre: 'Audífonos Gamer Profesional E1000 Usb Rgb 7.1 Pc',
      imagen: '/assets/icon/audifono1.jpg'
    },
    {
      nombre: 'Audifono Gamer Logitech G535',
      imagen: '/assets/icon/audifono2.jpg'
    },
    {
      nombre: 'Audífonos gamer a10',
      imagen: '/assets/icon/audifono3.jpg'
    },
    {
      nombre: 'Audífonos gamer onikuma k20 camuflaje blanco con luz rgb led',
      imagen: '/assets/icon/audifon5.jpg'
    },
    {
      nombre: 'Auriculares inalámbricos para PC',
      imagen: '/assets/icon/audifono5.jpg'
    },
    {
      nombre: 'Audífonos Gamer Logitech G335, Wired, Auricular Tamaño Completo',
      imagen: '/assets/icon/audifono6.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
