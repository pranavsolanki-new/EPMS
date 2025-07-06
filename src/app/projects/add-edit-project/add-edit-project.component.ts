import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent {
  statuses = ['In Progress', 'Completed', 'Pending']
  projectForm!: FormGroup;
  users: any = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.createForm();
    this.authService.getUsers().subscribe((res) => {
      this.users = res;
    })
    console.log(this.data)
    if (this?.data['id']) {
      this.projectService.getProjectListData(this?.data['id']).subscribe({
        next: (res: any) => {
          this.createForm(res);
        },
        error: (err) => {
        }
      })
    }
  }

  createForm(data?: any) {
    this.projectForm = this.fb.group({
      name: [{ value: data?.name || '', disabled: false }, Validators.required,],
      status: [data?.status || 'In Progress', Validators.required],
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || '', Validators.required],
      description: [data?.description],
      assignedUsers: [data?.assignedUsers ? data.assignedUsers.map((x: any) => x.id) : []],
      id: [data?.id || ''],
    });
  }

  parseResponse() {
    let startDate = '';
    let endDate = '';
    let tempStart = this.projectForm.value['startDate']
    let tempEnd = this.projectForm.value['endDate']
    console.log(this.projectForm.value)
    const assignedUsers = this.projectForm.value['assignedUsers'].map((id: any) => {
      const user = this.users.find((y: any) => y.id == id);
      return { id: user.id, name: user.name }
    })
    if (this.projectForm.value['startDate'] && typeof (this.projectForm.value['startDate']) !== 'string') {
      startDate = typeof (this.projectForm.value['startDate']) !== 'string' ? this.projectForm.value['startDate']?.toLocaleDateString('en-CA') : this.projectForm.value['startDate'];
    }
    if (this.projectForm.value['endDate'] && typeof (this.projectForm.value['endDate']) !== 'string') {
      endDate = typeof (this.projectForm.value['endDate']) !== 'string' ? this.projectForm.value['endDate']?.toLocaleDateString('en-CA') : this.projectForm.value['endDate'];
    }
    const id = Math.floor(10 + Math.random() * 1000);
    if (this.data.mode == 'Add') this.projectForm.patchValue({ id: String(id), assignedUsers: assignedUsers, startDate: startDate, endDate: endDate });
    if (this.data.mode == 'Edit') {
      this.projectForm.patchValue({ assignedUsers: assignedUsers, startDate: startDate == '' ? tempStart : startDate, endDate: endDate == '' ? tempEnd : endDate });
    }
  }

  submit() {
    this.parseResponse();
    if (this.data.mode == 'Add') {
      console.log(this.projectForm);
      this.projectService.addProjects(this.projectForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    else {
      console.log(this.projectForm.value)
      this.projectService.editProjects(this.projectForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }


}