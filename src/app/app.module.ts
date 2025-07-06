import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from './shared/shared.module';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AddEditTaskComponent } from './tasks/add-edit-task/add-edit-task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    RouterModule,
    NgChartsModule,
    DragDropModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
