import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, tap } from 'rxjs';
import { CommonService } from '../core/common.service';


@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost:3000/notifications';
  private notificationSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationSubject.asObservable();

    private unreadCount = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCount.asObservable();

  constructor(private http: HttpClient,private commonService : CommonService) {
    this.getNotifications()
  }

  getNotifications() {
     this.http.get<any[]>(this.apiUrl).subscribe({
        next:(notif:any)=>{
          notif.sort((a:any,b:any)=>{ return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()})
          this.notificationSubject.next(notif)
          const unread = notif.filter((n:any) => !n.read).length;
        this.unreadCount.next(unread);
        if (unread > 0) {
          this.commonService.showToast('info', `${unread} new notifications`);
        }
        },
      error:(err)=>this.notificationSubject.next([])
  })
  }

  markAllAsRead() {
     let  updateNotif:any =[]
    const currentNotif = this.notificationSubject.getValue();
    updateNotif= currentNotif.forEach((element:any) => {
          element.read = true;
    });
   const updateRqst = updateNotif.map((val:any)=>{
    this.http.patch(`${this.apiUrl}/${val.id}`,{read:true})
   })
   return forkJoin(updateRqst).pipe(tap(()=>{this.notificationSubject.next(updateNotif)}))
  }

 markAsRead(notificationId: string){
  return this.http.patch<any>(`${this.apiUrl}/${notificationId}`, { read: true }).pipe(
    tap((updatedNotification) => {
      const updatedNotifications:any = this.notificationSubject.getValue().map((n:any) =>
        n.id === notificationId ? updatedNotification : n
      );
      this.notificationSubject.next(updatedNotifications);
    })
  );
}


  addNotification(notification: any) {
    const id = Math.floor(10 + Math.random() * 1000);
    notification['id'] = String(id);
    notification['read'] = false;
    this.http.post(this.apiUrl,notification).subscribe((res)=>{this.getNotifications()})
  }

  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}