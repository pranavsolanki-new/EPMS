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
  notifications$: Observable <any>;
  unreadCount :Observable <any>

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private commonService:CommonService
  ) {
     this.notifications$ = this.notificationService.notifications$
     this.unreadCount = this.notificationService.unreadCount$
    console.log(this.notifications$)
  }

  ngOnInit(): void {
   // this.loadNotifications();
  }

  loadNotifications() {
   this.notificationService.addNotification({message:'header added',type:'info'});
  }

   markAllRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: () =>  this.commonService.showToast('info', `All Notifications has been read`),
      error: () => alert('Error marking notifications'),
    });
  }

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe((res)=>{
      this.commonService.showToast('info', `The notification has been read`)
    });
  }

  deleteNotification(id:string) {
  this.notificationService.deleteNotification(id).subscribe((res)=>{
  })
  }
}

