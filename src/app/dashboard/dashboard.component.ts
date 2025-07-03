import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
     dashboardStats:any
  chartLabels!: string[];
  chartData!: number[];
  public doughnutChartOptions:ChartOptions<'doughnut'> = {
    responsive:true,
    maintainAspectRatio : false,}
  public doughnutChartType : ChartType = 'doughnut';
  constructor(private dashboardService: DashboardService){
  }

  ngOnInit(){
    this.dashboardService.getDashboardStats().subscribe({
      next:(res)=>{
        console.log(res)
        this.dashboardStats = res
      },
    })

    this.dashboardService.getProjectStatus().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.chartLabels = res.labels;
        this.chartData = res.data
      }
    })
  }

}
