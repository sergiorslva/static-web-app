import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApontamentosComponent } from './apontamentos/apontamentos.component';
import { NovoRegistroComponent } from './novo-registro/novo-registro.component';

const routes: Routes = [
  {
    path: '',
    component: ApontamentosComponent,
  },
  {
    path: 'apontamento',
    component: ApontamentosComponent
  },
  {
    path: 'novo-apontamento',
    component: NovoRegistroComponent
  },
  {
    path: 'editar-apontamento/:partitionkey/:rowkey',
    component: NovoRegistroComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
