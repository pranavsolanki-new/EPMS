import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { CommonService } from 'src/app/core/common.service';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})

export class AddEditTaskComponent implements OnInit {
  projectId!: string;
  taskId!: string;
  taskForm!: FormGroup;
  statuses = ['To Do', 'In Progress', 'Done'];
  priorities = ['Low', 'Medium', 'High']
  mode = '';

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private taskService: TaskService,
    private router: Router, private commonService: CommonService, private notificationService: NotificationService,) {

  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.url[0]?.path
    this.projectId = this.route.parent!.snapshot.paramMap.get('projectId') ?? '';
    if (this.mode == 'edit') {
      this.taskId = this.route.snapshot.paramMap.get('taskId') ?? '';
      this.taskService.getTasks(this.taskId).subscribe({
        next: (res) => {
          this.createForm(res);
        },
        error: (err) => {
        }
      })
    }
    else {
      this.createForm();
    }

  }

  createForm(data?: any) {
    this.taskForm = this.fb.group({
      title: [{ value: data?.title || '', disabled: false }, Validators.required,],
      status: [data?.status || 'In Progress', Validators.required],
      dueDate: [data?.dueDate || '', Validators.required],
      description: [data?.description],
      priority: [data?.priority || 'Medium'],
      id: [data?.id || ''],
      projectId: [this.projectId || '']
    });
  }

  parseResponse() {
    let dueDate = '';
    let tempDueDate = this.taskForm.value['dueDate']
    if (this.taskForm.value['dueDate'] && typeof (this.taskForm.value['dueDate']) !== 'string') {
      dueDate = typeof (this.taskForm.value['dueDate']) !== 'string' ? this.taskForm.value['dueDate']?.toLocaleDateString('en-CA') : this.taskForm.value['dueDate'];
    }
    const id = Math.floor(10 + Math.random() * 1000);
    if (this.mode == 'add') this.taskForm.patchValue({ id: String(id), dueDate: dueDate });
    if (this.mode == 'edit') {
      this.taskForm.patchValue({ dueDate: dueDate == '' ? tempDueDate : dueDate });
    }
  }

  submit() {
    this.parseResponse()
    if (this.mode == 'add') {
      this.taskService.addTask(this.taskForm.value).subscribe({
        next: (res) => {
          let data = {
            message: 'You have successfully Added Task',
            button: 'Close',
            duration: 2000
          }
          this.notificationService.addNotification({ message: 'header added', type: 'info', timestamp: new Date() });
          this.commonService.getSnackBar(data)
          this.router.navigate(['/projects', this.projectId, 'tasks'])
        },
        error: (err) => {
        }
      })
    }
    else {
      this.taskService.updateTask(this.taskForm.value).subscribe({
        next: (res) => {
          let data = {
            message: 'You have successfully Updated Task',
            button: 'Close',
            duration: 2000
          }
          this.notificationService.addNotification({ message: 'header added', type: 'info', timestamp: new Date() });
          this.commonService.getSnackBar(data)
          this.router.navigate(['/projects', this.projectId, 'tasks'])
        },
        error: (err) => {
        }
      })
    }
  }

  onCancel() {
    this.router.navigate(['/projects', this.projectId, 'tasks'])
  }
}
