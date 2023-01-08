import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  termino:string="";
  heroes:Heroe[]=[];

  heroeSeleccionado!:Heroe;

  constructor(private heroeService:HeroesService){

  }

  buscando(){
    this.heroeService.obtenerSugerencia(this.termino).subscribe(heroes => {
      this.heroes=heroes;
    })
  }

  opcionSeleccionada( event:MatAutocompleteSelectedEvent  ){

    const heroe:Heroe = event.option.value;

    this.termino=heroe.superhero;

    this.heroeService.obtenerHeroe(heroe.id!)
    .subscribe( response => {
      this.heroeSeleccionado=response;
    })

  }
}
