import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import * as moment from 'moment';
import { Chart } from 'chart.js';
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage {
  Title: string = null;
  Users = [];
  Record = [];
 
  Height = [];
  Weight = [];
  BSugar = [];
  BP = [];
  BP1 = [];
  BPTemp1 = [];
  BPTemp2 = [];

  HDate = [];
  WDate = [];
  BSDate = [];
  BPDate = [];

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
        let L = this.Record.length
        for (var i=0; i<L; i+=1){
          if (this.Record[i].Description == "Height"){
              this.Record[i].DateInserted = moment(this.Record[i].DateInserted).format('ll');
              this.Height.push(this.Record[i].First);
              this.HDate.push(this.Record[i].DateInserted)
          }
            else if(this.Record[i].Description == "Weight"){
              this.Record[i].DateInserted = moment(this.Record[i].DateInserted).format('ll');
              this.Weight.push(this.Record[i].First);
              this.WDate.push(this.Record[i].DateInserted)
            }
            else if(this.Record[i].Description == "Blood Sugar"){
              this.Record[i].DateInserted = moment(this.Record[i].DateInserted).format('ll');
              this.BSugar.push(this.Record[i].First);
              this.BSDate.push(this.Record[i].DateInserted)
            }
            else if(this.Record[i].Description == "Blood Pressure"){
              this.Record[i].DateInserted = moment(this.Record[i].DateInserted).format('ll');
              this.BP.push(this.Record[i].First);
              this.BP1.push(this.Record[i].Second);
              this.BPTemp1.push(120);
              this.BPTemp2.push(80);
              this.BPDate.push(this.Record[i].DateInserted)
            }
        }
          this.chart();
      })
    }
  
    chart() {
             this.HeightChart = new Chart(this.HeightCanvas.nativeElement, {
                 type: 'line',
                 data: {
                     labels: this.HDate,
                     datasets: [
                         {
                             label: "Height in cm",
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
                             data: this.Height,
                             spanGaps: false,
                         }
                     ]
                 }
             });

             this.WeightChart = new Chart(this.WeightCanvas.nativeElement, {
              type: 'line',
              data: {
                  labels: this.WDate,
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
                          data: this.Weight,
                          spanGaps: false,
                      }
                  ]
              }
          });

          this.BSugarChart = new Chart(this.BSugarCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.BSDate,
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
                        data: this.BSugar,
                        spanGaps: false,
                    }
                ]
            }
        });

        this.BPChart = new Chart(this.BPCanvas.nativeElement, {
          type: 'line',
          data: {
              labels: this.BPDate,
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
                      data: this.BP,
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
                    data: this.BP1,
                    spanGaps: false,
                  }
              ]
          }
          
      });
      
         }
}
