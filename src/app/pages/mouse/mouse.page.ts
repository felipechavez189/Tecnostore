import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.page.html',
  styleUrls: ['./mouse.page.scss'],
})
export class MousePage implements OnInit {

  Mouse = [
    {
      nombre: 'Monitor 27" FHD 240HZ 1MS',
      imagen: '/assets/icon/mouse1.jpg'
    },
    {
      nombre: 'Monitor Gamer Samsung Odyssey G3 S27ag32 Lcd 27 Negro',
      imagen: '/assets/icon/mouse2.jpg'
    },
    {
      nombre: 'Monitor Gaming Aoc C27g2z 27 240hz 0.5ms',
      imagen: '/assets/icon/mouse3.jpg'
    },
    {
      nombre: 'Monitor Gamer Led 24 Full Hd 180hz 1ms',
      imagen: '/assets/icon/mouse4.jpg'
    },
    {
      nombre: 'Monitor Gamer Curvo Kolke 31,5 Full Hd 165hz 1ms Freesync Color Negro',
      imagen: '/assets/icon/mouse5.jpg'
    },
    {
      nombre: 'Monitor Gamer Kolke 27 Ips Ejecutivo 100hz 1ms Freesync Color Negro',
      imagen: '/assets/icon/mouse6.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
