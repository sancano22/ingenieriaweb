import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {GaleriaComponent} from './pages/galeria/galeria.component';
import {DetalleGaleriaComponent} from './pages/detalle-galeria/detalle-galeria.component';
import {IniciosesionComponent} from './pages/iniciosesion/iniciosesion.component';
const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'galerias', component:GaleriaComponent},
  {path:'detalle/:id',component:DetalleGaleriaComponent},
  {path:'sesion', component:IniciosesionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
