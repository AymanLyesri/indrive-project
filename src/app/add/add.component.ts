import { Component } from '@angular/core';
import { CarService } from '../services/car/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent
{

  model: string = "";
  user_id: string = "";

  responses: string[] = [];

  constructor(private carService: CarService, private router: Router) { }

  submit()
  {
    console.log(this.model, this.user_id);
    this.carService.addData({ id: '', model: this.model, user_id: this.user_id }).subscribe((data) =>
    {
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      this.router.navigate(['/read']);
    }
    );


  }

}
