import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule
  ]
})
export class PokemonGridComponent {
  @Input() pokemons: any[] = [];
  displayedColumns: string[] = ['id', 'image', 'name', 'types'];

  constructor(private router: Router) {}

  goToDetail(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
} 