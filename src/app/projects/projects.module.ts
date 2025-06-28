import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProjectListComponent,
    AddEditProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
    
   // RouterModule
  ]
})
export class ProjectsModule { }
