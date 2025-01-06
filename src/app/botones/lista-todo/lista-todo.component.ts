import { Component,EventEmitter,inject, Output, ViewChild } from '@angular/core';
import { ApiPokemonService } from '../../services/api-pokemon.service';
import { Pokemon, PokemonGeneral, PokemonResponse } from '../../models/pokemon.model';
import { Router } from '@angular/router';
import { DetallePokemonComponent } from '../../detalle-pokemon/detalle-pokemon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-lista-todo',
  imports: [NgClass],
  templateUrl: './lista-todo.component.html',
  styleUrls: ['./lista-todo.component.css']
})

export class ListaTodoComponent {
  @Output() pokemonsLoaded = new EventEmitter<PokemonGeneral[]>();
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
        const pokemonGeneral:PokemonGeneral[]  = data.results.map(result => {
          return { name: result.name, url: result.url, id: this.obtenerId(result.url) }
        })
        this.pokemonsLoaded.emit(pokemonGeneral);
      });
    }
  }

  obtenerId(url: string): number{
    const urlSplit = url.split('/');
    return parseInt(urlSplit[6]);
  }
}





