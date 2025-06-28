import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from './filter-bar/filter-bar/filter-bar.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterBarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    FilterBarComponent
  ]
})
export class SharedModule { }
