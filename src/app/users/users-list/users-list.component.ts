import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ResetPasswordDialogComponent } from 'src/app/shared/reset-password-dialog/reset-password-dialog.component';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit, AfterViewInit {
  userData!: any;
  dataSource: any = new MatTableDataSource<any>()
  searchControl = new FormControl('')
  allUsers: any = [];
  displayedColumns = ['name', 'role', 'email', 'actions']
  columnLabel: any = {
    'name': 'Name',
    'role': 'Role',
    'email': 'Email Id',
    'actions': 'Actions'
  }
  filterEmpty: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UsersService, private dialog: MatDialog, private router: Router,
    private commonService: CommonService, private route: ActivatedRoute, private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.dataSource.data = res
        this.filterEmpty = res;
      },
      error: (err) => {
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  addUser() {
    this.router.navigate(['users/add'])
  }

  editUser(id: string) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }

  deleteUser(id: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?'
      }
    }).afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.deleteUser(id).subscribe({
          next: (res) => {
            let data = {
              message: `You have successfully Deleted User`,
              button: 'Close',
              duration: 2000
            }
            this.notificationService.addNotification({ message: 'header added', type: 'info', timestamp: new Date() });
            this.commonService.getSnackBar(data)
            this.getUserData();
          },
          error: (err) => { }
        })
      }
    })
  }


  applyFilters(value: any) {
    let nullChecker = Object.values(value).every((x) => x === '' || x === null);
    if (nullChecker) {
      this.dataSource.data = [...this.filterEmpty];
      return;
    }

    const { name, status } = value;
    let filteredData = [...this.filterEmpty];

    if (name && name.trim() !== '') {
      filteredData = filteredData.filter((x: any) =>
        x.name.toLowerCase().includes(name.trim().toLowerCase())
      );
    }

    if (status && status !== 'All') {
      filteredData = filteredData.filter((x: any) =>
        x.role.includes(status)
      );
    }
    this.dataSource.data = filteredData;
  }

  trackByUserId(index: number, user: any) {
    return user.id;
  }

  resetPassword(id: string) {
    this.dialog.open(ResetPasswordDialogComponent, {
      data: {
        userId: id
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          message: 'You have successfully Reset the Password',
          button: 'Close',
          duration: 2000
        }
        this.commonService.getSnackBar(data)
      }
    })
  }

}
