import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './read/read.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [{ path: '', redirectTo: '/auth', pathMatch: 'full' },
{ path: 'auth', component: AuthenticationComponent },
{ path: 'read/:table', component: ReadComponent },
{ path: 'add', component: AddComponent },
{ path: 'update/:id', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
