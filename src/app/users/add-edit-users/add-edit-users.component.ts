import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { CommonService } from 'src/app/core/common.service';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})

export class AddEditUsersComponent implements OnInit {
  mode: string = '';
  userId: string = '';
  userForm!: FormGroup;
  roles = ['Project Manager', 'Admin', 'Developer']
  constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService, private fb: FormBuilder, private userService: UsersService, private commonService: CommonService,) { }

  ngOnInit(): void {
    this.mode = this.route.snapshot.url[0]?.path
    if (this.mode == 'edit') {
      this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
      this.userService.getUsers(this.userId).subscribe({
        next: (res) => {
          this.createForm(res);
        },
        error: (err) => {
        }
      })
    }
    else {
      this.createForm()
    }

  }

  createForm(data?: any) {
    this.userForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      role: [data?.role || '', Validators.required],
      password: [data?.password || '', Validators.required],
      id: [data?.id || '']
    })
  }

  Submit() {
    if (this.mode == 'add') {
      const id = Math.floor(10 + Math.random() * 1000);
      this.userForm.patchValue({ id: String(id) });
      this.userService.addUser(this.userForm.value).subscribe({
        next: (res) => {
          let data = {
            message: `You have successfully Added User`,
            button: 'Close',
            duration: 2000
          }
          this.notificationService.addNotification({ message: 'new user added', type: 'info', timestamp: new Date() });
          this.commonService.getSnackBar(data)
          this.router.navigate(['/users'])
        },
        error: (err) => { }
      })
    }
    else {
      this.userService.updateUser(this.userForm.value).subscribe({
        next: (res) => {
          let data = {
            message: `You have successfully Updated User`,
            button: 'Close',
            duration: 2000
          }
          this.notificationService.addNotification({ message: '1 userinfo updated', type: 'info', timestamp: new Date() });
          this.commonService.getSnackBar(data)
          this.router.navigate(['/users'])
        },
        error: (err) => { }
      })
    }
  }

}