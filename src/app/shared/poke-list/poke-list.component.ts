import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { GetAllPokemons, PokemonList } from 'src/app/service/types';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  constructor(
    private pokeApiService: PokeApiService
  ) {}

  public pokemonList!: Array<PokemonList>
  private setPokemonList!: Array<PokemonList>
  public hasError:boolean = false

  ngOnInit(): void {
    this.pokeApiService.listAllPokemons.subscribe({
      next: res => {
        if(this.hasError) this.hasError = false
        this.setPokemonList = res.results
        this.pokemonList = this.setPokemonList
      },
      error: err => {
        console.error(err)
        this.hasError = true
      }
    })
  }

  public search(value: string): void {
    value = value.toLocaleLowerCase()
    const filterByName = this.setPokemonList.filter(pokemon => {
      const name = pokemon.name.toLocaleLowerCase()
      return name.indexOf(value) > -1
    })

    if(filterByName.length) {
      this.pokemonList = filterByName
      return 
    }

    const filterByType = this.setPokemonList.filter(pokemon => {
      const types = pokemon.status?.types?.map(({ type: { name } }) => name.toLocaleLowerCase())
      let hasValue = false
      types?.forEach(name => {
        if(!hasValue) {
          hasValue = name.indexOf(value) > -1
        }
      })

      return hasValue
    })

    if(filterByType.length) this.pokemonList = filterByType
  }
}
