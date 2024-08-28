import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teclados',
  templateUrl: './teclados.page.html',
  styleUrls: ['./teclados.page.scss'],
})
export class TecladosPage implements OnInit {

  teclados = [
    {
      nombre: 'Teclado Mecánico Gamer Redragon Kumara K552',
      imagen: '/assets/icon/teclado1.jpg'
    },
    {
      nombre: 'Teclado Gamer G413 Carbon Logitech',
      imagen: '/assets/icon/teclado2.jpg'
    },
    {
      nombre: 'Teclado gamer xtech arminger xtk-510S',
      imagen: '/assets/icon/teclado3.jpg'
    },
    {
      nombre: 'Teclado Gamer Xpg Mage Rgb Gaming Red Switch Acuario',
      imagen: '/assets/icon/teclado4.jpg'
    },
    {
      nombre: 'Teclado Gamer Hp Gk100 Qwerty Español Con Luz Rgb - Progaming',
      imagen: '/assets/icon/teclado5.jpg'
    },
    {
      nombre: 'Teclado Mecánico con Retroiluminación',
      imagen: '/assets/icon/teclado6.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
