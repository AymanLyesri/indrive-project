import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService
{

  private url = environment.url + '/cars'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  // GET request to fetch data
  public getData(): Observable<any[]>
  {
    return this.http.get<any[]>(this.url);
  }

  // POST request to add data
  addData(data: Car): Observable<any>
  {
    return this.http.post<any>(this.url, data);
  }

  // PUT request to update data
  updateData(id: string, model: string, user_id: string): Observable<any>
  {
    return this.http.put<any>(`${this.url}/${id}`, { model, user_id });

  }

  // DELETE request to delete data
  deleteData(id: string): Observable<any>
  {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
