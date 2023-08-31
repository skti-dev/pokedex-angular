import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { PokemonDetails } from 'src/app/service/types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  public pokemon!: PokemonDetails
  public isLoading:boolean = true
  public hasError:boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokemonDetail()
  }

  public pokemonDetail() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.getPokemonDetail(`${this.urlPokemon}/${id}`)
    const name = this.pokeApiService.getPokemonDetail(`${this.urlName}/${id}`)
    
    return forkJoin([pokemon, name]).subscribe({
      next: res => {
        this.pokemon = res.reduce((result, current) => {
          return { ...result, ...current };
      }, { id });
      this.isLoading = false
      },
      error: err => {
        console.error(err)
        this.hasError = true
      }
    }) 
  }
}
