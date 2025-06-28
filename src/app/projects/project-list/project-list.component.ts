import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-projects',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit,AfterViewInit{
  projectData!:any;
  dataSource:any = new MatTableDataSource<any>()
  searchControl = new FormControl('')
  
  displayedColumns =['name','status','startDate','endDate','assignedUsers','description','actions']
  columnLabel:any ={
  'name':'Project Name',
  'status':'Status',
  'startDate':'Start Date',
  'endDate':'End Date',
  'assignedUsers':'Assigned Users',
  'description':'Description',
  'actions':'Actions'
  }
  filterEmpty: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(private projectService: ProjectService){}

ngOnInit() {
  this.projectService.getProjectListData().subscribe({
    next:(res)=>{
     this.dataSource.data =  res
     this.filterEmpty = res;
     console.log(this.dataSource.data)
    },
    error:(err)=>{}
  })

 // this.searchControl.valueChanges.pipe(debounceTime(500),distinctUntilChanged()).subscribe((res)=>{
 //   this.applyFilter(res);
 // })
}

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort
}

deleteProject(id:number){

}

OnPageChange(event:any){

}

applyFilters(value:any){
 console.log(value)
 console.log(Object.values(value))
 this.dataSource.data = this.filterEmpty;
 let nullChecker = Object.values(value).every((x)=> x == '' || x== null)
 
 if(nullChecker){
  this.dataSource.data = this.filterEmpty
 }
 else{
  const {name, status, fromDate, toDate} = value;
  if(name !=''){
   let filterdata  = this.dataSource.data.filter((x:any)=>x.name.toLowerCase().includes(name))
   //console.log(filterdata)
  this.dataSource.data = filterdata
  }
  if(status !=''){
    console.log(status)
    if(status=='All'){
    this.dataSource.data = this.filterEmpty
    }
    else{
let filterdata  = this.dataSource.data.filter((x:any)=> x.status.includes(status))
    this.dataSource.data = filterdata
    }
    
  }
  if(value.fromDate!=null || value.toDate != null){
   
    let filterdata  = this.dataSource.data.filter((item:any)=> {
        const fromTime = fromDate? new Date(fromDate).getTime():0;
    const toTime = toDate? new Date(toDate).getTime():0;
      const itemStart = new Date(item.startDate).getTime(); 
       const itemEnd = new Date(item.endDate).getTime();
      console.log(fromTime)
        console.log(toTime)
         if(fromTime>0 && toTime>0  ){
           console.log('fromto')
            return itemStart>= fromTime && itemEnd<=toTime
         }
         else if(fromTime>0 && toTime ==0){
          console.log('from')
          return itemStart>=fromTime
         }
          else if(toTime>0 && fromTime ==0){
            console.log('to')
          return itemEnd<=toTime
         }
         else{
          console.log('not')
          return true
         }
        
    })
   this.dataSource.data = filterdata
  }
  
 }
}

}
