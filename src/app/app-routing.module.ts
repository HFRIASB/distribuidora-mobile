import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
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
    path: 'direcciones',
    loadChildren: () => import('./cliente/direcciones/direcciones.module').then( m => m.DireccionesPageModule)
  },
  {
    path: 'nueva-direccion',
    loadChildren: () => import('./cliente/nueva-direccion/nueva-direccion.module').then( m => m.NuevaDireccionPageModule)
  },
  {
    path: 'direccion-vista',
    loadChildren: () => import('./cliente/direccion-vista/direccion-vista.module').then( m => m.DireccionVistaPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./repartidor/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'pedido-vista',
    loadChildren: () => import('./repartidor/pedido-vista/pedido-vista.module').then( m => m.PedidoVistaPageModule)
  },  {
    path: 'pedido-cliente',
    loadChildren: () => import('./cliente/pedido-cliente/pedido-cliente.module').then( m => m.PedidoClientePageModule)
  },
  {
    path: 'direccion-pedido',
    loadChildren: () => import('./repartidor/direccion-pedido/direccion-pedido.module').then( m => m.DireccionPedidoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
