import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { GetAllPokemons, PokemonDetails } from './types';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'

  constructor(private http: HttpClient) { }

  get listAllPokemons(): Observable<GetAllPokemons> {
    return this.http.get<GetAllPokemons>(this.url).pipe(
      tap(res => res),
      tap(res => {
        res.results.map(pokemon => {
          this.getPokemonDetail(pokemon.url).subscribe(pokeDetails => pokemon.status = pokeDetails)
        })
      })
    )
  }

  public getPokemonDetail(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url).pipe(
      map(allPokeInfos => allPokeInfos)
    )
  }
}
