import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import * as moment from 'moment';
import { Chart } from 'chart.js';
@Component({
  selector: 'page-monthly-chart',
  templateUrl: 'monthly-chart.html',
})
export class MonthlyChartPage {
  Title: string = null;
  Users = [];
  Record = [];

  LM_Height = [];
  LM_Weight = [];
  LM_BSugar = [];
  LM_BP = [];
  LM_BP1 = [];

  LM_HeightDate = [];
  LM_WeightDate = [];
  LM_BSugarDate = [];
  LM_BPDate = [];

  @ViewChild('HeightCanvas') HeightCanvas;
  @ViewChild('WeightCanvas') WeightCanvas;
  @ViewChild('BSugarCanvas') BSugarCanvas;
  @ViewChild('BPCanvas') BPCanvas;
  
  HeightChart: any;
  WeightChart: any;
  BSugarChart: any;
  BPChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider) {
    this.Users = this.databaseprovider.User;
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadRecord();
      }
    })
  }

  loadRecord(){
    
      this.databaseprovider.getRecord().then(data => {
        this.Record = data;
        let  Month = new Date();
        Month.setDate(new Date(Month).getDate()-30)

        let L = this.Record.length
        for (var i=0; i<L; i+=1){
          if (this.Record[i].Description == "Height"){
              let RecordDate = new Date(this.Record[i].DateInserted)
               if (RecordDate >= Month){
                this.LM_Height.push(this.Record[i].First);
                this.LM_HeightDate.push(moment(RecordDate).format('ll'))
               }
          }
            else if(this.Record[i].Description == "Weight"){
                let RecordDate = new Date(this.Record[i].DateInserted)
                 if (RecordDate >= Month){
                    this.LM_Weight.push(this.Record[i].First);
                    this.LM_WeightDate.push(moment(RecordDate).format('ll'))
                 }
            }
            else if(this.Record[i].Description == "Blood Sugar"){
                let RecordDate = new Date(this.Record[i].DateInserted)
                if (RecordDate >= Month){
                    this.LM_BSugar.push(this.Record[i].First);
                    this.LM_BSugarDate.push(moment(RecordDate).format('ll'))
                }
            }
            else if(this.Record[i].Description == "Blood Pressure"){
                let RecordDate = new Date(this.Record[i].DateInserted)
                 if (RecordDate >= Month){
                    this.LM_BP.push(this.Record[i].First);
                    this.LM_BP1.push(this.Record[i].Second);
                    this.LM_BPDate.push(moment(RecordDate).format('ll'))
                }
            }
        }
          this.chart();
      })
    }
    chart() {
             this.HeightChart = new Chart(this.HeightCanvas.nativeElement, {
                 type: 'line',
                 data: {
                     labels: this.LM_HeightDate,
                     datasets: [
                         {
                             label: "Weekly",
                             fill: false,
                             lineTension: 0.1,
                             backgroundColor: "rgba(75,192,192,0.4)",
                             borderColor: "rgba(75,192,192,1)",
                             borderCapStyle: 'butt',
                             borderDash: [],
                             borderDashOffset: 0.0,
                             borderJoinStyle: 'miter',
                             pointBorderColor: "rgba(75,192,192,1)",
                             pointBackgroundColor: "#fff",
                             pointBorderWidth: 1,
                             pointHoverRadius: 5,
                             pointHoverBackgroundColor: "rgba(75,192,192,1)",
                             pointHoverBorderColor: "rgba(220,220,220,1)",
                             pointHoverBorderWidth: 2,
                             pointRadius: 2,
                             pointHitRadius: 10,
                             data: this.LM_Height,
                             spanGaps: false,
                         }
                     ]
                 }
             });

             this.WeightChart = new Chart(this.WeightCanvas.nativeElement, {
              type: 'line',
              data: {
                  labels: this.LM_WeightDate,
                  datasets: [
                      {
                          label: "Weight in kg",
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: "rgba(75,192,192,0.4)",
                          borderColor: "rgba(75,192,192,1)",
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: 'miter',
                          pointBorderColor: "rgba(75,192,192,1)",
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: "rgba(75,192,192,1)",
                          pointHoverBorderColor: "rgba(220,220,220,1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 2,
                          pointHitRadius: 10,
                          data: this.LM_Weight,
                          spanGaps: false,
                      }
                  ]
              }
          });

          this.BSugarChart = new Chart(this.BSugarCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.LM_BSugarDate,
                datasets: [
                    {
                        label: "Blood Sugar in mmol/L",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 2,
                        pointHitRadius: 10,
                        data: this.LM_BSugar,
                        spanGaps: false,
                    }
                ]
            }
        });

        this.BPChart = new Chart(this.BPCanvas.nativeElement, {
          type: 'line',
          data: {
              labels: this.LM_BPDate,
              datasets: [
                  {
                      label: "Systolic",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "#3A6CA7",
                      borderColor: "#3A6CA7",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "#3A6CA7",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "#3A6CA7",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 2,
                      pointHitRadius: 10,
                      data: this.LM_BP,
                      spanGaps: false,
                  },
                  {
                    label: "Diastolic",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#af596a",
                    borderColor: "#823C3A",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#823C3A",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#823C3A",
                    pointHoverBorderColor: "#823C3A",
                    pointHoverBorderWidth: 2,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.LM_BP1,
                    spanGaps: false,
                  }
              ]
          }
          
      });
      
         }
}
