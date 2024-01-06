import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService
{

  private url = environment.url + '/users'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  // GET request to fetch data
  public getData(): Observable<any[]>
  {
    return this.http.get<any[]>(this.url);
  }

  // POST request to add data
  addData(data: User): Observable<any>
  {
    return this.http.post<any>(this.url, data);
  }

  // PUT request to update data
  updateData(id: string, login: string, password: string, admin: boolean): Observable<any>
  {
    return this.http.put<any>(`${this.url}/${id}`, { login, password, admin });
  }

  // DELETE request to delete data
  deleteData(id: string): Observable<any>
  {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
