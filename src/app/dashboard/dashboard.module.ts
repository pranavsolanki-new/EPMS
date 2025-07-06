import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { materialize } from 'rxjs';
import { MaterialModule } from '../shared/material/material.module';
import { DashboardService } from './dashboard.service';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [DashboardService]

})
export class DashboardModule { }
