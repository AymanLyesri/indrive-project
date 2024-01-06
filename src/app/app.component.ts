import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/security/authentication.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  title = 'indrive-frontend';
  loggedIn: boolean = false;


  constructor(private router: Router, private auth: AuthenticationService)
  {
    this.loggedIn = localStorage.getItem('id') == null ? false : true;
    console.log(this.loggedIn);
  }

  ngOnInit(): void
  {
    this.auth.isLogged().subscribe((logged) =>
    {
      this.loggedIn = logged;
    }
    );


  }

  logout()
  {

    this.auth.setLogged(false);
    localStorage.removeItem('id');
    this.router.navigate(['/']).then(() =>
    {
      alert("You have been logged out");
    })

  }
}
