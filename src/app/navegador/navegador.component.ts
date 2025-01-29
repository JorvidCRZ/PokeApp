import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ListaFavoritoComponent } from '../botones/lista-favorito/lista-favorito.component';
import { ListaTodoComponent } from '../botones/lista-todo/lista-todo.component';
import { CargaComponent } from '../carga/carga.component';
import { Pokemon, PokemonGeneral } from '../models/pokemon.model';
import { ErrorComponent } from '../error/error.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { ApiPokemonService } from '../services/api-pokemon.service';

@Component({
  standalone: true,
  imports: [
    ErrorComponent,
    CargaComponent,
    RouterLink,
    ListaFavoritoComponent,
    ListaTodoComponent,
    NgIf,
    NgFor,
    NgClass,
  ],
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css',
})
export class NavegadorComponent implements OnInit {
  @ViewChild(ListaTodoComponent) listaTodoComponent!: ListaTodoComponent;
  @ViewChild(ListaFavoritoComponent)
  listaFavoritoComponent!: ListaFavoritoComponent;

  mostrarBusqueda: boolean = false;
  mostrarListaTodo: boolean = false;
  mostrarListaFavoritos: boolean = false;
  busquedaFallida: boolean = false;
  placeholderClass: string = '';
  newPlaceholder: string = '';
  textPlaceholder: string = 'Search';
  vacio?: string;
  carga: boolean = true;
  pokemonList: PokemonGeneral[] = [];
  isActive: { [key: number]: boolean } = {};
  Message: { [key: number]: string } = {};
  texto: string = '';
  botonFavoritoActivo: boolean = false;
  botonTodoActivo: boolean = false;

  private _apiPokemonService = inject(ApiPokemonService);
  public _pokemonService = inject(PokemonServiceService);
  private _router = inject(Router);
  public pokemon?: Pokemon;

  ngOnInit(): void {
    setTimeout(() => {
      this.carga = false;
    }, 3000);
  }

  buscarPorEnter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const texto = inputElement.value.trim().toLowerCase();
    if (texto) {
      this._apiPokemonService.getPokemonByNameOrId(texto).subscribe({
        next: (pokemon: Pokemon) => {
          this.pokemonList = [{
            name: pokemon.name,
            id: pokemon.id,
            url: ''
          }];
          this.busquedaFallida = false;
        }
      });

    } else {
      this.resetBusqueda();
    }
  }







  resetBusqueda(): void {
    this.pokemonList = [];
    this.mostrarBusqueda = false;
    this.busquedaFallida = false;
  }

  onPokemonsLoaded(pokemons: PokemonGeneral[]): void {
    this.busquedaFallida = false;
    this.pokemonList = pokemons;
    this.pokemonList.forEach((pokemon) => {
      this.isActive[pokemon.id!] = false;
    });
    this.mostrarListaTodo = true;
  }

  cambiar() {
    this.newPlaceholder = 'Search';
    this.placeholderClass = 'placeholder';
  }

  pokenombre(): void {
    this.listaTodoComponent.conseguirnombre();
  }

  
  toggleLista(listType: 'todo' | 'favoritos'): void {
    console.log('toggleLista', listType);
    if (listType === 'todo') {
      this.botonTodoActivo = true;
      this.botonFavoritoActivo = false;
    } else if (listType === 'favoritos') {
      this.botonTodoActivo = false;
      this.botonFavoritoActivo = true;
    }
  }

  seleccionarPokemon(id: number): void {
    this._router.navigate(['/pokemon', id]);
  }

  SaveToFavorites(pokemon: PokemonGeneral): void {
    console.log('SaveToFavorites', pokemon);
    if (pokemon && pokemon.id) {
      this._pokemonService.toggleFavorito(pokemon);
      this.Message[pokemon.id] = this._pokemonService.esFavorito(pokemon.id)
        ? `The Pokémon ${pokemon.name} was saved in favorites`
        : `The Pokémon ${pokemon.name} was removed from favorites`;
      setTimeout(() => {
        this.Message[pokemon.id!] = '';
      }, 3000);
    }
  }

  mostrarFavoritos(): void {
    this.pokemonList = this._pokemonService.getPokemon();
  }

}