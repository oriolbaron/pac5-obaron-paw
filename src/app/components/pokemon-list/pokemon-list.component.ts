import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonCardComponent } from '../../shared/components/pokemon-card/pokemon-card.component';
import { PokemonGridComponent } from '../../shared/components/pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    PokemonCardComponent,
    PokemonGridComponent
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  isLoading = true;
  showAsGrid = false;
  displayedColumns: string[] = ['id', 'image', 'name', 'types'];

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(20).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pokemons:', error);
        this.isLoading = false;
      }
    });
  }

  toggleView() {
    this.showAsGrid = !this.showAsGrid;
  }

  goToDetail(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
} 