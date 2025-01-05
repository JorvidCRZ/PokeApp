import { Component,EventEmitter,inject, Output, ViewChild } from '@angular/core';
import { ApiPokemonService } from '../../services/api-pokemon.service';
import { Pokemon, PokemonResponse } from '../../models/pokemon.model';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DetallePokemonComponent } from '../../detalle-pokemon/detalle-pokemon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-lista-todo',
  imports: [NgClass],
  templateUrl: './lista-todo.component.html',
  styleUrl: './lista-todo.component.css'
})

export class ListaTodoComponent {
  @Output() pokemonsLoaded = new EventEmitter<Pokemon[]>();
  @Output() mostrarEvent = new EventEmitter<boolean>();
  @ViewChild(DetallePokemonComponent) detalle!: DetallePokemonComponent; 
  
  pokemonList: Pokemon[] = [];
  private _apiPokemonService = inject(ApiPokemonService);
  private _router = inject(Router);
  public pokemon?: Pokemon;;
  mostrarLista: boolean = false;
  botonAllActivo: boolean = false;
  cargando: boolean = false;


  trackByIndex(index: number): number {
    return index;
  }

  navegate(id: number): void {
    this._router.navigate(['/pokemon', id]); 
  }

  conseguirnombre(): void {
    this.detalle.pokemon?.name;
  }
  
  mostrar(): void {
    this.botonAllActivo = !this.botonAllActivo;
    this.mostrarLista = !this.mostrarLista; 
    this.mostrarEvent.emit(this.mostrarLista);
    if (this.mostrarLista) {
      this._apiPokemonService.getAllPokemons().subscribe((data: PokemonResponse) => {
        const pokemonDetailsObservables = data.results.map(result =>
          this._apiPokemonService.getPokemonByNameOrId(result.name)
        );
        forkJoin(pokemonDetailsObservables).subscribe((pokemons: Pokemon[]) => {
          this.pokemonList = pokemons;
          this.pokemonsLoaded.emit(this.pokemonList);
        });
      });
    }
  }
}





