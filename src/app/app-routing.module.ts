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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
