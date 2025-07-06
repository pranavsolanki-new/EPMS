import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from './filter-bar/filter-bar/filter-bar.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    FilterBarComponent,
    ConfirmDialogComponent,
    ResetPasswordDialogComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[
    FilterBarComponent,
    ConfirmDialogComponent,
    ToastComponent
  ]
})
export class SharedModule { }
