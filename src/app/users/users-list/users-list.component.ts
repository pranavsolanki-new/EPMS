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

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit, AfterViewInit {
  userData!: any;
  dataSource: any = new MatTableDataSource<any>()
  searchControl = new FormControl('')
  allUsers:any =[];
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
    private commonService: CommonService, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource.data = res
        this.filterEmpty = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  addUser() {
    console.log('users/add')
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
            console.log(res);
            let data = {
              message: `You have successfully Deleted User`,
              button: 'Close',
              duration: 2000
            }
            this.commonService.getSnackBar(data)
            this.getUserData();
          },
          error: (err) => { }
        })
    }
    })
  }
    

  applyFilters(value: any) {
    console.log(value)
 let nullChecker = Object.values(value).every((x) => x == '' || x == null)
    if (nullChecker) {
       this.dataSource.data = [...this.filterEmpty];
    }
    else {
      const { name, status } = value;
      this.dataSource.data = [...this.filterEmpty];
      if(name!='' && status!=''){
         let filterdata = this.dataSource.data.filter((x: any) => x.name.toLowerCase().includes(name) && x.role.includes(status))
        this.dataSource.data = filterdata;
        console.log(filterdata)
      }
      if (name != '') {
        let filterdata = this.dataSource.data.filter((x: any) => x.name.toLowerCase().includes(name))
        this.dataSource.data = filterdata;
      }
      if (status != '') {
        console.log(status)
        if (status == 'All') {
          this.dataSource.data= [...this.filterEmpty]
        }
        else {
          let filterdata = this.dataSource.data.filter((x: any) => x.role.includes(status)) 
          this.dataSource.data = filterdata;
        }
      }  
  } 
}

  trackByUserId(index: number, user: any) {
    return user.id;
  }

  OnPageChange(event: any) {

  }

  resetPassword(id:string){
 this.dialog.open(ResetPasswordDialogComponent,{
      data:{
        userId:id
      }
    }).afterClosed().subscribe((result)=>{
      console.log(result)
      if(result){
              let data={
      message:'You have successfully Reset the Password',
      button:'Close',
      duration:2000
   }
   this.commonService.getSnackBar(data)
      }
    })
  }

}
