type PokemonTypeProps = {
  slot: number
  type: {
    name: string
  }
}

type PokemonStatsProps = {
  base_stat: number
  stat: {
    name: string
  }
}

export type PokemonDetails = {
  id: number
  name?: string
  types?: Array<PokemonTypeProps>
  stats?: Array<PokemonStatsProps>
  sprites?: {
    other?: {
      dream_world?: {
        front_default: string
      }
    }
  }
  names?: Array<{ name: string }>
}

export type PokemonList = {
  name: string
  url: string
  status?: PokemonDetails
}

export type GetAllPokemons = {
  count: number
  results: Array<PokemonList>
  next?: string
  previous?: string
}