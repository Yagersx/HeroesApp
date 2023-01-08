import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../heroes/interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http:HttpClient) { }

  obtenerHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`http://localhost:3000/heroes`);
  }

  obtenerHeroe(id:string): Observable<Heroe>{
    return this.http.get<Heroe>(`http://localhost:3000/heroes/${id}`);
  }

}
