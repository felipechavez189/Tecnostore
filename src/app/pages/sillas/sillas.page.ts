import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sillas',
  templateUrl: './sillas.page.html',
  styleUrls: ['./sillas.page.scss'],
})
export class SillasPage implements OnInit {

  Sillas = [
    {
      nombre: 'Silla Gamer Wetech Color Gris/Negro Modelo LS-1118',
      imagen: '/assets/icon/silla1.jpg'
    },
    {
      nombre: 'Silla Gamer Reclinable B/N',
      imagen: '/assets/icon/silla2.jpg'
    },
    {
      nombre: 'SILLA GAMER LUMAX ROM',
      imagen: '/assets/icon/silla3.jpg'
    },
    {
      nombre: 'Silla Gamer Racing Reclinable 180° Reposapiés Rojo',
      imagen: '/assets/icon/silla4.jpg'
    },
    {
      nombre: 'Silla Gamer Ergonomica Kingshouse Con Apoyapies Azul',
      imagen: '/assets/icon/silla5.jpg'
    },
    {
      nombre: 'Silla Gamer Semi Profesional Con Reposa Pies',
      imagen: '/assets/icon/silla6.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
