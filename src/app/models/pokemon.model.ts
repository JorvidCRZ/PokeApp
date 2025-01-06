export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  sprites: {
    front_default: string;
    front_shiny?: string;
  }
}

export interface PokemonGeneral {
  name: string; url: string, id?: number 
}

export interface PokemonResponse {
  results: PokemonGeneral[];  
}

export interface Type {
  slot: number;
  type: Species;
}
export interface Species {
  name: string;
  url: string;
}

export class Convert {
  public static toPokemon(json: string): Pokemon {
    return JSON.parse(json);
  }

  public static pokemonToJson(value: Pokemon): string {
    return JSON.stringify(value);
  }
}