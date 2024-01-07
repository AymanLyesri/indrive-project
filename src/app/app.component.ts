import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/security/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  title = 'indrive-frontend';
  loggedIn: boolean = false;
  isAdmin: boolean = false;


  constructor(private router: Router, private auth: AuthenticationService)
  {
    this.loggedIn = localStorage.getItem('id') == null ? false : true;
    this.isAdmin = localStorage.getItem('admin') === 'true';
  }

  ngOnInit(): void
  {
    this.auth.isLogged().subscribe((logged) =>
    {
      this.loggedIn = localStorage.getItem('id') == null ? false : true;
      this.isAdmin = localStorage.getItem('admin') === 'true';
      console.log(this.loggedIn + " " + this.isAdmin);
    }
    );
  }

  logout()
  {
    localStorage.clear();
    this.auth.setLogged(false);
    this.router.navigate(['/']).then(() =>
    {
      alert("You have been logged out");
    })

  }
}
