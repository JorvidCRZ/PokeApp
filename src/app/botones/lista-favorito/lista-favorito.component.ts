import { Component,EventEmitter,inject, Output, ViewChild } from '@angular/core';
import { Pokemon, PokemonResponse } from '../../models/pokemon.model';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DetallePokemonComponent } from '../../detalle-pokemon/detalle-pokemon.component';
import { NgClass } from '@angular/common';
import { ApiPokemonService } from '../../services/api-pokemon.service';
import { PokemonServiceService } from '../../services/pokemon-service.service';

@Component({
  selector: 'app-lista-favorito',
  imports: [NgClass],
  templateUrl: './lista-favorito.component.html',
  styleUrl: './lista-favorito.component.css'
})
export class ListaFavoritoComponent {
  @Output() pokemonsLoaded = new EventEmitter<Pokemon[]>();
  @ViewChild(DetallePokemonComponent) detalle!: DetallePokemonComponent;
    
    pokemonList: Pokemon[] = [];
    private _apiPokemonService = inject(ApiPokemonService);
    private _pokemonService = inject(PokemonServiceService);
    private _router = inject(Router);
    public pokemon?: Pokemon;;
    mostrarLista: boolean = false;
    botonAllActivo: boolean = false;
    cargando: boolean = false;
    public pokemons?: Pokemon;

    mostrarfavorito(): void {
      this.botonAllActivo = !this.botonAllActivo;
      this.mostrarLista = !this.mostrarLista;
      this.cargando = true;
  
      if (this.mostrarLista) {
        this.pokemonList = this._pokemonService.getPokemon(); 
        this.pokemonsLoaded.emit(this.pokemonList);
        this.cargando = false; 
      } else {
        this._apiPokemonService.getPokemons().subscribe((data: PokemonResponse) => {
          const pokemonDetailsObservables = data.results.map(result =>
            this._apiPokemonService.getPokemonByNameOrId(result.name)
          );
          forkJoin(pokemonDetailsObservables).subscribe((pokemons: Pokemon[]) => {
            this.pokemonList = pokemons;
            this.pokemonsLoaded.emit(this.pokemonList);
            this.cargando = false;
          });
        });
      }
    }
  }
