import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargaComponent } from '../carga/carga.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink,CargaComponent],  
  template: `<app-carga></app-carga>`,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  carga: boolean = true;


  ngOnInit(): void {
    setTimeout(() => {
      this.carga = false;
    }, 3000);
  }
}