import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProjectComponent } from '../add-edit-project/add-edit-project.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/common.service';
import { filter } from 'rxjs';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-projects',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit, AfterViewInit {
  projectData!: any;
  dataSource: any = new MatTableDataSource<any>()
  searchControl = new FormControl('')

  displayedColumns = ['name', 'status', 'startDate', 'endDate', 'assignedUsers', 'description', 'actions']
  columnLabel: any = {
    'name': 'Project Name',
    'status': 'Status',
    'startDate': 'Start Date',
    'endDate': 'End Date',
    'assignedUsers': 'Assigned Users',
    'description': 'Description',
    'actions': 'Actions'
  }
  filterEmpty: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private projectService: ProjectService, private dialog: MatDialog, private router: Router,
    private commonService: CommonService, private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList() {
    this.projectService.getProjectListData().subscribe({
      next: (res: any) => {
        res?.forEach((element: any) => {
          let users = element.assignedUsers.map((x: any) => x.name).join(',')
          element.assignedUsers = users;
        })
        this.dataSource.data = res
        this.filterEmpty = res;
      },
      error: (err) => { }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  applyFilters(value: any) {
    let nullChecker = Object.values(value).every(x => x == '' || x == null);
    if (nullChecker) {
      this.dataSource.data = [...this.filterEmpty];
      return;
    }

    const { name, status, fromDate, toDate } = value;
    let filterData = [...this.filterEmpty];

    if (name) {
      filterData = filterData.filter((x: any) =>
        x.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (status && status !== 'All') {
      filterData = filterData.filter((x: any) => x.status === status);
    }

    if (fromDate || toDate) {
      const fromTime = fromDate ? new Date(fromDate).getTime() : null;
      const toTime = toDate ? new Date(toDate).getTime() : null;

      filterData = filterData.filter((item: any) => {
        const itemStart = new Date(item.startDate).getTime();
        const itemEnd = new Date(item.endDate).getTime();

        if (fromTime && toTime) {
          return itemStart >= fromTime && itemEnd <= toTime;
        }

        if (fromTime && !toTime) {
          return itemStart >= fromTime;
        }

        if (!fromTime && toTime) {
          return itemEnd <= toTime;
        }
        return true;
      });
    }
    this.dataSource.data = filterData;
  }

  addProject() {
    const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '800px',
      data: { mode: 'Add' }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          message: 'You have successfully Added Project',
          button: 'Close',
          duration: 2000
        }
        this.notificationService.addNotification({ message: 'new project added', type: 'info', timestamp: new Date() });
        this.commonService.getSnackBar(data)
        this.getProjectList();
      }
    })
  }

  editProject(id: string) {
    const dialogRef = this.dialog.open(AddEditProjectComponent, {
      width: '800px',
      data: { mode: 'Edit', id: id }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          message: 'You have successfully Updated Project',
          button: 'Close',
          duration: 2000
        }
        this.notificationService.addNotification({ message: '1 project updated', type: 'info', timestamp: new Date() });
        this.commonService.getSnackBar(data)
        this.getProjectList();
      }
    })
  }

  deleteProject(id: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?'
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.deleteProjects(id).subscribe((res) => {
          let data = {
            message: 'You have successfully Deleted Project',
            button: 'Close',
            duration: 2000
          }
          this.notificationService.addNotification({ message: '1 project deleted', type: 'warning', timestamp: new Date() });
          this.commonService.getSnackBar(data)
          this.getProjectList();
        })
      }
    })
  }

  trackByProjectId(index: number, project: any) {
    return project.id;
  }

  viewtasks(id: string) {
    this.router.navigate(['/projects', id, 'tasks'])
  }

}
