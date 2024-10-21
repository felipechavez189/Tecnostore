import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router , NavigationExtras} from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  cantidad : number = 1
  producto : any 
  idUsuario! : number

  constructor(private activated : ActivatedRoute, private router : Router, private storage :NativeStorage, private dbService : ServiceBDService) {
    this.activated.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.producto = this.router.getCurrentNavigation()?.extras.state?.['productoEnviado']
      }
    })

   }

  ngOnInit() {
    this.obtenerIdUsuario()
  }

  async obtenerIdUsuario(){
    this.idUsuario = await this.storage.getItem('Usuario_logueado')
  }

  alarmaCarrito(idproducto : number){
    if(this.idUsuario){
      this.dbService.agregarACarrito(this.idUsuario,idproducto,this.cantidad).then(()=>{
        console.log('Añadido correctanmente')
      })
    }
  }


  volverSeccionAnterior(idcategoria : number){
    let NavigationExtras: NavigationExtras = {
      state:{
        idCategoriaSeleccionada: idcategoria
      }
    }
    this.router.navigate(['/productos-por-categoria'],NavigationExtras)
  }



 aumentarCantidad(){
  this.cantidad = this.cantidad++
 }  


 disminuirCantidad(){
  if(this.cantidad !== 1){
    this.cantidad = this.cantidad--
  }


  }



}


