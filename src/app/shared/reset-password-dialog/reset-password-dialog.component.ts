import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/users/users.service';

export interface ResetPasswordDialogData {
  userId: string;
}

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})

export class ResetPasswordDialogComponent {
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResetPasswordDialogData,
    private userService: UsersService
  ) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordValidator })
    this.passwordForm.valueChanges.subscribe((res) => {
      this.passwordForm.updateValueAndValidity({ emitEvent: false })
    })
  }

  passwordValidator(group: FormGroup) {
    const newpass = group.get('newPassword')?.value;
    const confirmpass = group.get('confirmPassword')?.value;
    return newpass == confirmpass ? null : { mismatch: true }
  }

  onSubmit() {
    if (this.passwordForm.invalid) return;
    let submitForm = {
      id: this.data?.userId,
      password: this.passwordForm.value['confirmPassword']
    }
    this.userService.resetPassword(submitForm).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
      }
    })
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
