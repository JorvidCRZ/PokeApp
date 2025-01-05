import { Component, Input, OnInit,inject } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { ApiPokemonService } from '../services/api-pokemon.service';
import { CargaComponent } from '../carga/carga.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  standalone: true,
  selector: 'app-detalle-pokemon',
  imports: [CargaComponent,NgIf,NgFor,NgClass],
  templateUrl: './detalle-pokemon.component.html',
  styleUrl: './detalle-pokemon.component.css'
})
export class DetallePokemonComponent implements OnInit {
  _pokemonService = inject(PokemonServiceService);

 
  loading: boolean = true;
  public pokemon?: Pokemon; 
  mostrarShiny: boolean = false;
  shiny: string = '';
  showContainer: boolean = true;
  isActive: boolean = false;
  Message: string = '';
  share: string = '';
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiPokemonService);

  ngOnInit(): void {
    const idOrName = this._route.snapshot.paramMap.get('idOrName');
    
    if (idOrName) {
      this._apiService.getPokemonByNameOrId(idOrName).subscribe({
        next: (data: Pokemon) => {
          this.pokemon = data;
          this.loading = false;
        },
        error: () => {
          console.error('Error al cargar los datos del Pokémon');
          this.loading = false;
        }
      });
    } else {
      console.error('No se proporcionó un ID o nombre de Pokémon en la URL');
      this.loading = false;
    }   
  }

  toggleFavorito(): void {
    if (this.pokemon) {
      this._pokemonService.toggleFavorito(this.pokemon);
      this.isActive = this._pokemonService.esFavorito(this.pokemon.id); 
      this.Message = this.isActive
        ? `The Pokémon ${this.pokemon?.name} was saved in favorites`
        : `The Pokémon ${this.pokemon?.name} was removed from favorites`;
      setTimeout(() => {
        this.Message = '';
      }, 1500);
    }
  }

  formatTypes(): string {
    return this.pokemon?.types.map(t => t.type.name).join(', ') || 'Unknown';
  }

  clickShiny(): void {
    this.isActive = !this.isActive;
    this.mostrarShiny = !this.mostrarShiny;
    this.shiny = this.mostrarShiny ? 'Shiny' : 'Normal';
    setTimeout(() => {
      this.shiny = ''; 
    }, 2000);
  }

  shareToFriends() {
    this.share = 'Pokémon shared successfully with your friends!';
    setTimeout(() => {
      this.share = ''; 
    }, 2000);
  }

  closeContainer(): void {
    this.showContainer = false;
    this._router.navigate(['navegador']);
  }
}