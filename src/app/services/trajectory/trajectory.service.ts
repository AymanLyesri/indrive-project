import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trajectory } from 'src/app/models/trajectory.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TrajectoryService
{

  private url = environment.url + '/trajectories'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  // GET request to fetch data
  public getData(): Observable<any[]>
  {
    return this.http.get<any[]>(this.url);
  }

  // POST request to add data
  addData(data: Trajectory): Observable<any>
  {
    return this.http.post<any>(this.url, data);
  }

  // PUT request to update data
  updateData(trajectory: Trajectory): Observable<any>
  {
    return this.http.put<any>(`${this.url}/${trajectory.id}`, { from_place: trajectory.from_place, to_place: trajectory.to_place, car_id: trajectory.car_id });
  }

  // DELETE request to delete data
  deleteData(id: string): Observable<any>
  {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
