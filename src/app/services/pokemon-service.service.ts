import { Injectable } from '@angular/core';
import { PokemonGeneral } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  private localStorageKey = 'listaPokemon';

  getPokemon(): PokemonGeneral[] {
    const pokemons = localStorage.getItem(this.localStorageKey);
    return pokemons ? JSON.parse(pokemons) : [];
  }

  agregarPokemon(pokemon: PokemonGeneral): void {
    const pokemons = this.getPokemon();
    if (!pokemons.some(p => p.id === pokemon.id)) {
      pokemons.push(pokemon);
      localStorage.setItem(this.localStorageKey, JSON.stringify(pokemons));
    }
  }

  esFavorito(id: number): boolean {
    const pokemons = this.getPokemon();
    return pokemons.some(p => p.id === id);
  }

  eliminarPokemon(id: number): void {
    const pokemons = this.getPokemon();
    const updatedPokemons = pokemons.filter(p => p.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPokemons));
  }

  toggleFavorito(pokemon: PokemonGeneral): void {
    if (this.esFavorito(pokemon.id!)) {
      this.eliminarPokemon(pokemon.id!);
    } else {
      this.agregarPokemon(pokemon);
    }
  }
}