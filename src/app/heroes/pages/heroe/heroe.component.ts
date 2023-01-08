import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../../services/heroes.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;
  id: string = '';

  constructor(private activatedRoute: ActivatedRoute, private heroeService: HeroesService) {


  }

  ngOnInit(): void {
    this.activatedRoute.params.
      pipe(
        switchMap(params => this.heroeService.obtenerHeroe(params['id'])),
        tap(resp => console.log(resp)
        )
      )
      .subscribe(heroe => {
        this.heroe = heroe;
      })
  }


}
