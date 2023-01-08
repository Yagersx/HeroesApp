import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../heroes/interfaces/heroes.interfaces';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiUrl:string = environment.apiUrl;



  constructor(private http:HttpClient) {

   }

  obtenerHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`);
  }

  obtenerHeroe(id:string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.apiUrl}/heroes/${id}`);
  }

  obtenerSugerencia(termino:string): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.apiUrl}/heroes/?q=${termino}&_limit=5`);
  }

}
