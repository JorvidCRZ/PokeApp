import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {
  private _http = inject(HttpClient);
  private _urlEndPoint: string = 'https://pokeapi.co/api/v2/';

  getAllPokemons(limit: number = 200): Observable<PokemonResponse> {
    return this._http.get<PokemonResponse>(`${this._urlEndPoint}pokemon?limit=${limit}`);
  }

  getPokemons(): Observable<PokemonResponse> {
    return this._http.get<PokemonResponse>(`${this._urlEndPoint}pokemon`);
  }
  
  getPokemonByNameOrId(idOrName: string | number): Observable<Pokemon> {
    return this._http.get<Pokemon>(`${this._urlEndPoint}pokemon/${idOrName}`);
  }
}
