import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'teclados',
    loadChildren: () => import('./pages/teclados/teclados.module').then( m => m.TecladosPageModule)
  },
  {
    path: 'monitores',
    loadChildren: () => import('./pages/monitores/monitores.module').then( m => m.MonitoresPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },  {
    path: 'audifonos',
    loadChildren: () => import('./pages/audifonos/audifonos.module').then( m => m.AudifonosPageModule)
  },
  {
    path: 'mouse',
    loadChildren: () => import('./pages/mouse/mouse.module').then( m => m.MousePageModule)
  },
  {
    path: 'sillas',
    loadChildren: () => import('./pages/sillas/sillas.module').then( m => m.SillasPageModule)
  },
  {
    path: 'pc',
    loadChildren: () => import('./pages/pc/pc.module').then( m => m.PcPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'crud',
    loadChildren: () => import('./pages/crud/crud.module').then( m => m.CrudPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'codigo',
    loadChildren: () => import('./pages/codigo/codigo.module').then( m => m.CodigoPageModule)
  },
  {
    path: 'nueva',
    loadChildren: () => import('./pages/nueva/nueva.module').then( m => m.NuevaPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./pages/modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'teclado1',
    loadChildren: () => import('./pages/teclado1/teclado1.module').then( m => m.Teclado1PageModule)
  },
  {
    path: 'monitor1',
    loadChildren: () => import('./pages/monitor1/monitor1.module').then( m => m.Monitor1PageModule)
  },
  {
    path: 'audifonos1',
    loadChildren: () => import('./pages/audifonos1/audifonos1.module').then( m => m.Audifonos1PageModule)
  },
  {
    path: 'mouse1',
    loadChildren: () => import('./pages/mouse1/mouse1.module').then( m => m.Mouse1PageModule)
  },
  {
    path: 'sillas1',
    loadChildren: () => import('./pages/sillas1/sillas1.module').then( m => m.Sillas1PageModule)
  },
  {
    path: 'pc1',
    loadChildren: () => import('./pages/pc1/pc1.module').then( m => m.Pc1PageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
