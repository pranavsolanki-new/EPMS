import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskListComponent } from './task-list/task-list.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';


@NgModule({
  declarations: [
  TaskListComponent,
    AddEditTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule,
  ]
})
export class TaskModule { }
