import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {

  teclados = [
    {
      nombre: 'Monitor 27" FHD 240HZ 1MS',
      imagen: '/assets/icon/monitor1.jpg'
    },
    {
      nombre: 'Monitor Gamer Samsung Odyssey G3 S27ag32 Lcd 27 Negro',
      imagen: '/assets/icon/monitor2.jpg'
    },
    {
      nombre: 'Monitor Gaming Aoc C27g2z 27 240hz 0.5ms',
      imagen: '/assets/icon/monitor3.jpg'
    },
    {
      nombre: 'Monitor Gamer Led 24 Full Hd 180hz 1ms',
      imagen: '/assets/icon/monitor4.jpg'
    },
    {
      nombre: 'Monitor Gamer Curvo Kolke 31,5 Full Hd 165hz 1ms Freesync Color Negro',
      imagen: '/assets/icon/monitor5.jpg'
    },
    {
      nombre: 'Monitor Gamer Kolke 27 Ips Ejecutivo 100hz 1ms Freesync Color Negro',
      imagen: '/assets/icon/monitor6.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}