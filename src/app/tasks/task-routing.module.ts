import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

const routes: Routes = [
  {path:'',component:TaskListComponent},
  {path:'add',component:AddEditTaskComponent},
  {path:'edit/:taskId',component:AddEditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
