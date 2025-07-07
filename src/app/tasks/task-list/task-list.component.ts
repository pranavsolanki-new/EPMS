import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/common.service';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  allTasks: any[] = [];
  projectId = '';
  sortBy: string = 'dueDate'
  sorting = ['dueDate', 'priority'];
  filterEmpty = []
  dropList = ['toDoList', 'inProgressList', 'doneList']

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private commonService: CommonService, private notificationService: NotificationService,) {
  }
  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId') ?? '';
    this.getTasksByProjectId()
  }

  getTasksByProjectId() {
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (res) => {
        this.allTasks = res;
        this.filterEmpty = res
        this.filterData(res);
      },
      error: (err) => {
      }
    })
  }

  filterData(data: any) {
    this.todoTasks = data.filter((task: any) => task.status == "To Do")
    this.inProgressTasks = data.filter((task: any) => task.status == "In Progress")
    this.doneTasks = data.filter((task: any) => task.status == "Done")
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.updateTask(task).subscribe((res) => {
      })
    }
  }

  addTask() {
    this.router.navigate(['add'], { relativeTo: this.route })
  }

  editTask(id: string) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }

  deleteTask(id: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?'
      }
    }).afterClosed().subscribe((result: any) => {
      if (result) {
        this.taskService.deleteTask(id).subscribe({
          next: (res) => {
            let data = {
              message: 'You have successfully Deleted Task',
              button: 'Close',
              duration: 2000
            }
            this.notificationService.addNotification({ message: '1 task deleted', type: 'warning', timestamp: new Date() });
            this.commonService.getSnackBar(data)
            this.getTasksByProjectId()
          },
          error: (err) => {
          }
        })
      }
    })
  }

  applyFilters(value?: any) {
    let nullChecker = Object.values(value).every((x) => x === '' || x === null);
    if (nullChecker) {
      this.filterData(this.filterEmpty);
      return;
    }
    const { name, status, fromDate, toDate } = value;
    const filteredTasks = this.filterEmpty.filter((item: any) => {
      let matches = true;
      if (name) {
        matches = matches && item.title.toLowerCase().includes(name.toLowerCase());
      }
      if (status && status !== 'All') {
        matches = matches && item.priority.includes(status);
      }
      const dueDate = new Date(item.dueDate).getTime();
      const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
      const toTime = toDate ? new Date(toDate).getTime() : 0;
      if (fromTime > 0 && toTime > 0) {
        matches = matches && (dueDate >= fromTime && dueDate <= toTime);
      } else if (fromTime > 0) {
        matches = matches && (dueDate >= fromTime);
      } else if (toTime > 0) {
        matches = matches && (dueDate <= toTime);
      }
      return matches;
    });
    this.filterData(filteredTasks);
  }

  applySorting() {
    if (this.sortBy == 'priority') {
      const sortOrder: any = { 'High': 1, 'Medium': 2, 'Low': 3 }
      this.allTasks.sort((a, b) => sortOrder[a.priority] - sortOrder[b.priority])
    }
    if (this.sortBy == 'dueDate') {
      this.allTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    }
    this.filterData(this.allTasks);
  }

}