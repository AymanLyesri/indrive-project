import { Component } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car/car.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent
{

  model: string = '';
  user_id: string = '';

  public responses: string[] = [];
  public cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void
  {

    this.carService.getData().subscribe((cars: Car[]) =>
    {
      this.cars = cars;
      console.log(cars);
    }
    );

  }

  deleteCar(id: string)
  {
    this.carService.deleteData(id).subscribe((response) =>
    {
      console.log(response);
      this.responses.push(response.message);
      this.cars = this.cars.filter(car => car.id !== id);
    });
  }
}
