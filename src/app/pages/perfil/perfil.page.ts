import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  email: string = ''; // Variable para almacenar el correo

  constructor(private route: ActivatedRoute) { } // Inyecta ActivatedRoute

  ngOnInit() {
    // Recupera el correo pasado en NavigationExtras
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
  }

}
