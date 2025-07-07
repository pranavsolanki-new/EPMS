import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'add', component: AddEditUsersComponent },
  { path: 'edit/:userId', component: AddEditUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
