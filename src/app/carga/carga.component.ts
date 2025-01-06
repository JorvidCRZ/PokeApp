import { NgClass, NgFor } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-carga',
  standalone: true, 
  imports: [NgClass,NgFor],
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent   {
    texto = 'Cargando...';
    letras = this.texto.split('');
}
