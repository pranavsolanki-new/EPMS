import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];


  constructor(private taskService:TaskService){
  }
   ngOnInit(): void {
    // Mock data - Replace with API call
    this.todoTasks = [
      { id: 1, title: 'Task 1', status: 'To Do' },
      { id: 2, title: 'Task 2', status: 'To Do' },
    ];
    this.inProgressTasks = [
      { id: 3, title: 'Task 3', status: 'In Progress' }
    ];
    this.doneTasks = [
      { id: 4, title: 'Task 4', status: 'Done' }
    ];
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Optionally: call API to persist status change
    //  this.taskService.updateTask(task).subscribe();
    }
  }
}