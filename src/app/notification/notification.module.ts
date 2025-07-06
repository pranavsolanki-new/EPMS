import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NotificationBadgeComponent } from './notification-badge/notification-badge.component';


@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationBadgeComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
  ],
  exports:[
    NotificationListComponent,
    NotificationBadgeComponent
  ]
})
export class NotificationModule { }
