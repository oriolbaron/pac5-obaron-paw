import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: PokemonListComponent 
  },
  { 
    path: 'pokemon/:id', 
    loadComponent: () => import('./components/pokemon-detail/pokemon-detail.component')
      .then(m => m.PokemonDetailComponent)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 