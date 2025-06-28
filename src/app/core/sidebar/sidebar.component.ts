import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {
@Output() toggleSidenav = new EventEmitter<void>();
@Input() sidenav?:MatSidenav

closeSidenav(){
  this.sidenav?.close()
}
}
