import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  allTasks:any[] =[];
  projectId = '';
  sortBy:string='dueDate'
  sorting =['dueDate','priority'];
  filterEmpty =[]
  dropList =['toDoList','inProgressList','doneList']


  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog,private commonService:CommonService) {
  }
  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId') ?? '';
    console.log(this.projectId)
    this.getTasksByProjectId()
    // Mock data - Replace with API call
    /* this.todoTasks = [
       { id: 1, title: 'Task 1', status: 'To Do' },
       { id: 2, title: 'Task 2', status: 'To Do' },
     ];
     this.inProgressTasks = [
       { id: 3, title: 'Task 3', status: 'In Progress' }
     ];
     this.doneTasks = [
       { id: 4, title: 'Task 4', status: 'Done' }
     ];*/
  }

  getTasksByProjectId() {
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (res) => {
        console.log(res)
        this.allTasks = res;
        this.filterEmpty  = res
       this.filterData(res);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

   filterData(data:any){
 this.todoTasks = data.filter((task: any) => task.status == "To Do")
        this.inProgressTasks = data.filter((task: any) => task.status == "In Progress")
        this.doneTasks = data.filter((task: any) => task.status == "Done")
   }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    console.log(newStatus,event)
    if (event.previousContainer === event.container) {
      //moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
      }
      else{
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;
console.log(task)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Optionally: call API to persist status change
      console.log(task)
      this.taskService.updateTask(task).subscribe((res)=>{
        console.log(res)
      })
    }
  }

  deleteTask(id: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?'
      }
    }).afterClosed().subscribe((result:any) => {
      console.log(result)
      if (result) {
        this.taskService.deleteTask(id).subscribe({
          next: (res) => {
            console.log(res)
             let data={
      message:'You have successfully Deleted Task',
      button:'Close',
      duration:2000
   }
   this.commonService.getSnackBar(data)
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    })
  }

  addTask() {
    this.router.navigate(['add'], { relativeTo: this.route })
  }

  editTask(id: string) {
    console.log(id)
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }

  applyFilters(value?:any){
    console.log(value)
     let nullChecker = Object.values(value).every((x) => x == '' || x == null)
    if (nullChecker) {
      this.allTasks = [...this.filterEmpty];
    }
    else {
      const { name, status, fromDate, toDate } = value;
      if (name != '') {
        let filterdata = this.allTasks.filter((x: any) => x.title.toLowerCase().includes(name))
        //console.log(filterdata)
        this.allTasks = filterdata
      }
      if (status != '') {
        console.log(status)
        if (status == 'All') {
          this.allTasks= [...this.filterEmpty]
        }
        else {
          this.allTasks = this.filterEmpty;
          let filterdata = this.allTasks.filter((x: any) => x.priority.includes(status))
          this.allTasks = filterdata
        }
      }
         
      if (value.fromDate != null || value.toDate != null) {
        let filterdata = this.allTasks.filter((item: any) => {
          const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
          const toTime = toDate ? new Date(toDate).getTime() : 0;
          const dueDate = new Date(item.dueDate).getTime();
          if (fromTime > 0 && toTime > 0) {
            console.log('fromto')
            return dueDate >= fromTime && dueDate <= toTime
          }
          else if (fromTime > 0 && toTime == 0) {
            console.log('from')
            return dueDate >= fromTime
          }
          else if (toTime > 0 && fromTime == 0) {
            console.log('to')
            return dueDate <= toTime
          }
          else {
            console.log('not')
            return true
          }

        })
        this.allTasks = filterdata
      }
    }
    this.filterData(this.allTasks);
  }

  applySorting(){
    if(this.sortBy =='priority'){
      const sortOrder:any ={'High':1,'Medium':2,'Low':3}
       this.allTasks.sort((a,b)=>sortOrder[a.priority] - sortOrder[b.priority])
    }
    if(this.sortBy =='dueDate'){
       this.allTasks.sort((a,b)=> new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    }
    this.filterData(this.allTasks);
  }

}