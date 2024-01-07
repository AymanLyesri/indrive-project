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
  public filteredCars: Car[] = [];

  public users: User[] = [];
  public filteredUsers: User[] = [];

  public trajectories: Trajectory[] = [];
  public filteredTrajectories: Trajectory[] = [];

  isAdmin: boolean = false;

  constructor(private carService: CarService,
    private route: ActivatedRoute, private userService: UserService, private trajectoryService: TrajectoryService, private router: Router)
  {
    this.isAdmin = localStorage.getItem('admin') === 'true';
  }

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.table = params['table']; // 'id' should match the parameter name defined in the route
    });

    this.carService.getData().subscribe((cars: Car[]) =>
    {
      if (this.isAdmin) {
        this.filteredCars = cars;
        console.log(cars);
        return;
      }
      let userId = localStorage.getItem('id');

      this.filteredCars = cars.filter(car =>
      {
        return car.user_id == userId;
      });
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
      if (this.isAdmin) {
        this.filteredTrajectories = trajectories;
        console.log(trajectories);
        return;
      }
      let userId = localStorage.getItem('id');

      this.filteredTrajectories = trajectories.filter(trajectory =>
      {
        let gg = this.filteredCars.some(car => car.id === trajectory.car_id);
        return gg;
      });
    });

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
        this.router.navigate(['/read/' + this.table]);
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
        this.router.navigate(['/read/' + this.table]);
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
        this.router.navigate(['/read/' + this.table]);
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
