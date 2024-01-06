import { Component } from '@angular/core';
import { CarService } from '../services/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private carService: CarService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void
  {
    // Accessing the ID parameter from the route
    this.route.params.subscribe(params =>
    {
      this.id = params['id']; // 'id' should match the parameter name defined in the route
    });
  }

  submit()
  {
    console.log(this.model, this.user_id);
    this.carService.updateData(this.id, this.model, this.user_id).subscribe((data) =>
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
