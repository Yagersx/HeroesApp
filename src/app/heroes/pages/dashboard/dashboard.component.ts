import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  get auth ():Auth{
   return this.authService.auth;
  }

  constructor(private router:Router, private authService: AuthService){

  }

  logout()
  {
    this.router.navigate(['./auth/login']);
  }

}
