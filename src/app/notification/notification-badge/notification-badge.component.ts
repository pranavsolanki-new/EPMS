import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-badge',
  templateUrl: './notification-badge.component.html',
  styleUrls: ['./notification-badge.component.scss'],
})
export class NotificationBadgeComponent implements OnInit{
  unreadCount$!: Observable<number>;

  constructor(private notificationService: NotificationService,private router:Router) {
  
  }

  ngOnInit() {
      this.unreadCount$ = this.notificationService.notifications$.pipe(
      map((notifications) => notifications.filter((n) => !n.read).length)
    );
    console.log(this.unreadCount$);
  }

  navigateToNotification(){
     this.router.navigate(['/notification'])
  }
}