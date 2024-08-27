import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  comuna:string=" lo espejo ";
  edad:number=25;
  nombreUsuario: string=" ";

  arreglo:any = {
    nombre: 'José',
    apellido: 'Gutierrez',
    edad: 29
  }

  lista: any = [
    {
    id: 1,
    nombre: 'María'
    }
  ]


  constructor(private router: Router) { }

  ngOnInit() {
  }

  irPagina(){
    //Puedo crear cualquier logica de programación
    this.router.navigate(['/signup']);
  }

}
