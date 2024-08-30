import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.page.html',
  styleUrls: ['./pc.page.scss'],
})
export class PcPage implements OnInit {

  PCArmados = [
    {
      nombre: '	Pc gamer vibora black v1',
      imagen: '/assets/icon/pc1.jpg'
    },
    {
      nombre: 'PC Gamer AMD Ryzen 5 5500',
      imagen: '/assets/icon/pc2.jpg'
    },
    {
      nombre: 'PC GAMER AMD RYZEN 5 5600g',
      imagen: '/assets/icon/pc3.jpg'
    },
    {
      nombre: 'Pc Gamer Spartan: Rz 3 2200g Pro',
      imagen: '/assets/icon/pc4.jpg'
    },
    {
      nombre: 'Pc gamer i5 11400f',
      imagen: '/assets/icon/pc5.jpg'
    },
    {
      nombre: 'Pc Gamer Intel I5 11400f',
      imagen: '/assets/icon/pc6.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
