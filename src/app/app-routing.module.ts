import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./login/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./cliente/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./cliente/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'direcciones',
    loadChildren: () => import('./cliente/direcciones/direcciones.module').then( m => m.DireccionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
