import { Routes } from '@angular/router';
import { NavegadorComponent } from './navegador/navegador.component';
import { InicioComponent } from './inicio/inicio.component';
import { DetallePokemonComponent } from './detalle-pokemon/detalle-pokemon.component';

export const routes: Routes = [   
  { path: '', component: InicioComponent },
  { path: 'navegador', component: NavegadorComponent },
  { path: 'pokemon/:idOrName', component: DetallePokemonComponent },
];
