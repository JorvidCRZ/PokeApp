import { Component,EventEmitter,inject, Output, ViewChild,Input } from '@angular/core';
import { Pokemon, PokemonGeneral } from '../../models/pokemon.model';
import { DetallePokemonComponent } from '../../detalle-pokemon/detalle-pokemon.component';
import { NgClass } from '@angular/common';
import { PokemonServiceService } from '../../services/pokemon-service.service';

@Component({
  selector: 'app-lista-favorito',
  imports: [NgClass],
  templateUrl: './lista-favorito.component.html',
  styleUrls: ['./lista-favorito.component.css']
})
export class ListaFavoritoComponent {
  @Output() pokemonsLoaded = new EventEmitter<PokemonGeneral[]>();
  @ViewChild(DetallePokemonComponent) detalle!: DetallePokemonComponent;
  @Output() mostrarEvent = new EventEmitter<boolean>();
  @Input() botonFavoritoActivo: boolean = false; 

    pokemonList: PokemonGeneral[] = [];
    
    private _pokemonService = inject(PokemonServiceService);
    public pokemon?: Pokemon;;
    mostrarLista !:boolean;
    cargando: boolean = false;
    public pokemons?: Pokemon;



    mostrarfavorito(): void {
      this.mostrarLista = true;
      this.mostrarEvent.emit(this.mostrarLista);
      this.cargando = true;
      
      if (this.mostrarLista) {
        this.pokemonList = this._pokemonService.getPokemon(); 
        this.pokemonsLoaded.emit(this.pokemonList);
        this.cargando = false; 
      }
    }
  }