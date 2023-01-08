import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  heroe: Heroe = {
    superhero: '',
    publisher: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {


    // this.activatedRoute.params.subscribe( params=> {
    //   this.heroeService.obtenerHeroe(params['id']).subscribe(heroe => {
    //     this.heroe=heroe;
    //   })
    // })

    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(params => this.heroeService.obtenerHeroe(params['id'])),
          tap(resp => console.log(resp))
        )
        .subscribe(heroe => {
          this.heroe = heroe;

        })
    }


  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroeService.editarHeroe(this.heroe).subscribe(heroe => {

        this.heroe = heroe;
      });
    } else {
      this.heroeService.guardarHeroe(this.heroe).subscribe(heroe => {
        this.heroe = heroe;
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }

  }

  borrar()
  {
    this.heroeService.borrarHeroe(this.heroe.id!).subscribe(resp => {
      this.router.navigate(['/heroes/listado'])

    });
  }


}
