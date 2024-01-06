import { Component } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car/car.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trajectory } from '../models/trajectory.model';
import { TrajectoryService } from '../services/trajectory/trajectory.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent
{

  public table: string = "";

  public cars: Car[] = [];
  public users: User[] = [];
  public trajectories: Trajectory[] = [];

  constructor(private carService: CarService,
    private route: ActivatedRoute, private userService: UserService, private trajectoryService: TrajectoryService, private router: Router) { }

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.table = params['table']; // 'id' should match the parameter name defined in the route
    });

    this.carService.getData().subscribe((cars: Car[]) =>
    {
      this.cars = cars;
      console.log(cars);
    }
    );
    this.userService.getData().subscribe((users: User[]) =>
    {
      this.users = users;
      console.log(users);
    }
    );
    this.trajectoryService.getData().subscribe((trajectories: Trajectory[]) =>
    {
      this.trajectories = trajectories;
      console.log(trajectories);
    }
    );
  }

  addCar(model: string, user_id: string)
  {
    console.log(model, user_id);
    this.carService.addData({ id: '', model, user_id }).subscribe((data) =>
    {
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      {
        this.router.navigate(['/read']);
      });
    }

    );
  }
  addUser(login: string, password: string, admin: boolean)
  {
    this.userService.addData({ id: '', login, password, admin }).subscribe((data) =>
    {
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      {
        this.router.navigate(['/read']);
      });
    }

    );
  }
  addTrajectory(trajectory: Trajectory)
  {
    this.trajectoryService.addData(trajectory).subscribe((data) =>
    {
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      {
        this.router.navigate(['/read']);
      });
    }

    );
  }



  deleteCar(id: string)
  {
    this.carService.deleteData(id).subscribe((response) =>
    {
      console.log(response);
      if (response.error) {
        alert(response.error);
        return;
      }
      this.cars = this.cars.filter(car => car.id !== id);

    });
  }

  deleteUser(id: string)
  {
    this.userService.deleteData(id).subscribe((response) =>
    {
      console.log(response);
      if (response.error) {
        alert(response.error);
        return;
      }
      this.users = this.users.filter(user => user.id !== id);
    });
  }
  deleteTrajectory(id: string)
  {
    this.trajectoryService.deleteData(id).subscribe((response) =>
    {
      console.log(response);
      if (response.error) {
        alert(response.error);
        return;
      }
      this.trajectories = this.trajectories.filter(trajectory => trajectory.id !== id);
    });
  }
}
