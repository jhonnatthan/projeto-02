import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoricoComponent } from './historico/historico.component';
import { CotacaoComponent } from './cotacao/cotacao.component';
import { EquipeComponent } from './equipe/equipe.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'price', component: CotacaoComponent },
  { path: 'history', component: HistoricoComponent },
  { path: 'team', component: EquipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
