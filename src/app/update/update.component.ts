import { Component } from '@angular/core';
import { CarService } from '../services/car/car.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent
{
  id: string = "";
  model: string = "";
  user_id: string = "";

  responses: string[] = [];

  constructor(private carService: CarService) { }

  submit()
  {
    console.log(this.model, this.user_id);
    this.carService.updateData(this.id, this.model, this.user_id).subscribe((data) =>
    {
      console.log(data);
      // this.responses.push(data.message + " : " + this.model + " " + this.user_id);
    }
    );


  }
}
