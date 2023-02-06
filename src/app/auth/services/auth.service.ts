import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { tap, Observable, map, of } from 'rxjs';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiUrl;
  private _auth: Auth | undefined;

  get auth () :Auth{
    return {...this._auth!};
  }

  constructor(private http:HttpClient) { }

  verificarAutenticacion(): Observable<boolean> {

    if(!localStorage.getItem('id')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(auth => {
        this._auth= auth;
        return true;

      })
    );
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap(resp => this._auth = resp),
      tap(resp => localStorage.setItem('id', resp.id))
    );
  }

  logout(){
    this._auth=undefined;
  }
}
