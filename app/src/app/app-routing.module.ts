import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CustoComponent } from './components/custo/custo.component';
import { ListaClienteComponent } from './components/cliente/lista.cliente.component';

const routes: Routes = [  
  {path: 'login', component: LoginComponent},
  {path: 'custos', component: CustoComponent},
  {path: 'clientes', component: ListaClienteComponent},
  {path: '', redirectTo: '/custos', pathMatch: 'full' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
