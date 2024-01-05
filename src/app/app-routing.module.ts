import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './read/read.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [{ path: '', redirectTo: '/read', pathMatch: 'full' },
{ path: 'read', component: ReadComponent },
{ path: 'add', component: AddComponent },
{ path: 'update', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
