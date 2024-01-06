import { Component } from '@angular/core';
import { AuthenticationService } from '../services/security/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent
{

  login: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  submit()
  {
    console.log(this.login, this.password);
    this.authService.authentication(this.login, this.password).subscribe((data: [number, boolean, boolean]) =>
    {
      console.log(data);
      if (!data[1]) {
        alert('Login ou mot de passe incorrect');
        return;
      }
      localStorage.setItem('id', data[0].toString());
      this.authService.setLogged(true);
      this.router.navigate(['/read/all']);

    }
    );
  }

}
