import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';


@Component({
  selector: 'app-privado',
  templateUrl: './privado.page.html',
  styleUrls: ['./privado.page.scss'],
})
export class PrivadoPage implements OnInit {

  

  constructor(private storage:StorageService) { }

  ngOnInit() {

    if(!this.storage.getCurrentUser()){
      window.location.href="/home";
    }

  }

  CerrarSession(){
     this.storage.CerrarSession();
  }
  public chartColors =[
    { // first color
      backgroundColor: 'rgba(25,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // first color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];

  public barChartType = 'bar';
  public barChartLabels = ['1', '2', '3', '4', '5', '6', '7'];
  public barChartLegend = true;

  public barChartData= [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'ECG',},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'RSP'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'TMP'}
  ];

}
