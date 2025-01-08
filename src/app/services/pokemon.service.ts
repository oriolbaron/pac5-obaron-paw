import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface PokemonResponse {
  results: Array<{ url: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number = 20): Observable<any[]> {
    return this.http.get<PokemonResponse>(`${this.baseUrl}/pokemon?limit=${limit}`).pipe(
      map((res) => res.results),
      switchMap(pokemons => {
        const requests = pokemons.map((pokemon) => 
          this.http.get(pokemon.url)
        );
        return forkJoin(requests);
      })
    );
  }

  getPokemon(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${id}`);
  }
} 