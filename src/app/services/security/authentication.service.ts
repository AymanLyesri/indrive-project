import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService
{

  loggedIn: Subject<boolean> = new Subject<boolean>();

  api: string = environment.url;

  constructor(private http: HttpClient) { }

  authentication(login: string, password: string): Observable<[number, boolean, boolean]> // [id, logged, admin]
  {
    return this.http.post<any>(`${this.api}/authentication`, { login, password });
  }

  setLogged(logged: boolean)
  {
    this.loggedIn.next(logged);
  }

  isLogged(): Observable<boolean>
  {
    return this.loggedIn.asObservable();
  }
}
