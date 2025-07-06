import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notifications$!: Observable <any>;
  unreadCount! :Observable <any>

  constructor(
    private notificationService: NotificationService,
    private commonService:CommonService
  ) {

  }

  ngOnInit(): void {
    //this.notificationService.addNotification({message:'header added',type:'info',timestamp:new Date()});
         this.notifications$ = this.notificationService.notifications$
     this.unreadCount = this.notificationService.unreadCount$
    console.log(this.notifications$)
  }

   markAllRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: () =>  {
        this.commonService.showToast('info', `All Notifications has been read`)
        this.notificationService.getNotifications()
      },
      error: () => this.commonService.showToast('warning', `something went wrong`)
    });
  }

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () =>  {
      this.notificationService.getNotifications()
      this.commonService.showToast('info', `The notification has been read`)
      },
      error: () => this.commonService.showToast('warning', `something went wrong`)
    });
  }

  deleteNotification(id:string) {
  this.notificationService.deleteNotification(id).subscribe({
       next: () =>  {
      this.notificationService.getNotifications()
      this.commonService.showToast('info', `The notification has been deleted`)
      },
      error: () => this.commonService.showToast('warning', `something went wrong`) 
  })
  }
}

