import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService
{

  private apiUrl = 'http://127.0.0.1:5000/api/cars'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  // GET request to fetch data
  public getData(): Observable<any[]>
  {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST request to add data
  addData(data: Car): Observable<any>
  {
    return this.http.post<any>(this.apiUrl, data);
  }

  // PUT request to update data
  updateData(id: string, model: string, user_id: string): Observable<any>
  {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { model, user_id });
  }

  // DELETE request to delete data
  deleteData(id: string): Observable<any>
  {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
