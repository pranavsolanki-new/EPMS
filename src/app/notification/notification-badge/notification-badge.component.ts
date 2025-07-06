import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-badge',
  templateUrl: './notification-badge.component.html',
  styleUrls: ['./notification-badge.component.scss'],
})
export class NotificationBadgeComponent {
  unreadCount$: Observable<number>;

  constructor(private notificationService: NotificationService) {
    this.unreadCount$ = this.notificationService.notifications$.pipe(
      map((notifications) => notifications.filter((n) => !n.read).length)
    );
  }
}