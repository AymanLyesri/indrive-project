import { Component } from '@angular/core';
import { CarService } from '../services/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { TrajectoryService } from '../services/trajectory/trajectory.service';

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

  login: string = '';
  password: string = '';
  admin: boolean = false;

  from_place: string = '';
  to_place: string = '';
  car_id: string = '';

  table: string = "";

  constructor(private carService: CarService,
    private userService: UserService, private trajectoryService: TrajectoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void
  {
    // Accessing the ID parameter from the route
    this.route.params.subscribe(params =>
    {
      this.table = params['table']; // 'id' should match the parameter name defined in the route
      this.id = params['id']; // 'id' should match the parameter name defined in the route
    });
  }

  updateUser()
  {
    console.log(this.login, this.password, this.admin);
    this.userService.updateData(this.id, this.login, this.password, this.admin).subscribe((data) =>
    {
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      // this.router.navigate(['/read']);
    }
    );
  }

  updateCar()
  {
    console.log(this.model, this.user_id);
    this.carService.updateData(this.id, this.model, this.user_id).subscribe((data) =>
    {
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      // this.router.navigate(['/read']);
    }
    );
  }

  updateTrajectory()
  {
    console.log(this.from_place, this.to_place, this.car_id);
    let trajectory = {
      id: this.id,
      from_place: this.from_place,
      to_place: this.to_place,
      car_id: this.car_id
    };
    this.trajectoryService.updateData(trajectory).subscribe((data) =>
    {
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      // this.router.navigate(['/read']);
    }
    );
  }
}
