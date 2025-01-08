import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { FlatTreeControl } from '@angular/cdk/tree';

interface PokemonNode {
  name: string;
  children?: PokemonNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTreeModule,
    MatChipsModule
  ]
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  isLoading = true;
  showAllDetails = false;
  
  private _transformer = (node: PokemonNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node: FlatNode) => node.level,
    (node: FlatNode) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node: FlatNode) => node.level,
    (node: FlatNode) => node.expandable,
    (node: PokemonNode) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPokemon(+id);
    }
  }

  loadPokemon(id: number) {
    this.pokemonService.getPokemon(id).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.prepareTreeData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pokemon:', error);
        this.isLoading = false;
      }
    });
  }

  prepareTreeData() {
    this.dataSource.data = [
      {
        name: 'Stats',
        children: this.pokemon.stats.map((stat: any) => ({
          name: `${stat.stat.name}: ${stat.base_stat}`
        }))
      },
      {
        name: 'Abilities',
        children: this.pokemon.abilities.map((ability: any) => ({
          name: ability.ability.name
        }))
      }
    ];
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 