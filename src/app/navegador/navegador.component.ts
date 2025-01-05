import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ListaFavoritoComponent } from '../botones/lista-favorito/lista-favorito.component';
import { ListaTodoComponent } from '../botones/lista-todo/lista-todo.component';
import { CargaComponent } from '../carga/carga.component';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';
import { ErrorComponent } from '../error/error.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { ApiPokemonService } from '../services/api-pokemon.service';
import { forkJoin } from 'rxjs';

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
  pokemonCache: Pokemon[] = [];
  pokemonList: Pokemon[] = [];
  isActive: { [key: number]: boolean } = {};
  Message: { [key: number]: string } = {};
  texto: string = '';
  currentView: 'all' | 'favorites' | 'search' = 'all';

  private _apiPokemonService = inject(ApiPokemonService);
  public _pokemonService = inject(PokemonServiceService);
  private _router = inject(Router);
  public pokemon?: Pokemon;

  ngOnInit(): void {
    setTimeout(() => {
      this.carga = false;
    }, 3000);
    this.cargarTodosLosPokemones();
  }

  cargarTodosLosPokemones(): void {
    this._apiPokemonService
      .getAllPokemons()
      .subscribe((data: PokemonResponse) => {
        const pokemonDetailsObservables = data.results.map((result) =>
          this._apiPokemonService.getPokemonByNameOrId(result.name)
        );
        forkJoin(pokemonDetailsObservables).subscribe((pokemons: Pokemon[]) => {
          this.pokemonCache = pokemons;
        });
      });
  }

  buscarPorEnter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const texto = inputElement.value.trim().toLowerCase();
    if (texto) {
      const resultados = this.pokemonCache.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(texto) ||
          pokemon.id.toString() === texto
      );
      this.pokemonList = resultados;
      this.currentView = resultados.length > 0 ? 'search' : 'search';
      this.busquedaFallida = resultados.length === 0;
    } else {
      this.resetBusqueda();
    }
  }

  resetBusqueda(): void {
    this.pokemonList = [];
    this.mostrarBusqueda = false;
    this.busquedaFallida = false;
    this.currentView = 'all';
  }

  onPokemonsLoaded(pokemons: Pokemon[]): void {
    this.busquedaFallida = false;
    this.pokemonList = pokemons;
    this.pokemonList.forEach((pokemon) => {
      this.isActive[pokemon.id] = false;
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

  mostrarTodo(): void {
    this.pokemonList = this.pokemonCache;
    this.mostrarListaTodo = true;
    console.log(this.pokemonList);
  }

  toggleListaTodo(): void {
    this.busquedaFallida = false;
    this.mostrarListaTodo = !this.mostrarListaTodo;
    this.mostrarListaFavoritos = false;
  }

  seleccionarPokemon(id: number): void {
    this._router.navigate(['/pokemon', id]);
  }

  SaveToFavorites(id: number, name: string): void {
    const pokemon = this.pokemonList.find((p) => p.id === id);
    if (pokemon) {
      this._pokemonService.toggleFavorito(pokemon);
      this.Message[id] = this._pokemonService.esFavorito(id)
        ? `The Pokémon ${name} was saved in favorites`
        : `The Pokémon ${name} was removed from favorites`;
      setTimeout(() => {
        this.Message[id] = '';
      }, 3000);
    }
  }

  mostrarFavoritos(): void {
    this.pokemonList = this._pokemonService.getPokemon();
    this.mostrarListaTodo = false;
    console.log(this.pokemonList);
  }

  setView(view: 'all' | 'favorites' | 'search'): void {
    this.currentView = view;
    this.busquedaFallida = false;

    if (view === 'all') {
      this.pokemonList = this.pokemonCache;
    } else if (view === 'favorites') {
      this.pokemonList = this._pokemonService.getPokemon();
    }
  }

  toggleAll(): void {
    this.setView('all');
  }

  toggleFavorite(): void {
    this.setView('favorites');
  }
}
