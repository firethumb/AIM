import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  canvas:any;
  ctx:any;
  constructor() { }

  ngOnInit() {
    this.drawChart('doughnut', 'myChart', ["New", "In Progress", "On-Hold"], [10,12,8])
    this.drawChart('line', 'expiredUsers', ["Jan-2018", "Feb-2018", "Mar-2018", "Apr-2018"], [30, 28, 24, 25]) 
  }

  drawChart(chartType, chartTitle, labels, data){
    this.canvas = document.getElementById(chartTitle);
    this.ctx = this.canvas.getContext('2d');
    chartTitle = new Chart(this.ctx, {
      type: chartType,
      data: {
          labels: labels,
          datasets: [{
              title: "Hotspot Users",
              label: '',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
  }
  
}
