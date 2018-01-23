import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-past-medication',
  templateUrl: 'past-medication.html',
})
export class PastMedicationPage {
  Users = [];
  Med = [];
  CurrentMed = [];
  constructor(public navCtrl: NavController,  private alertCtrl: AlertController,  public navParams: NavParams, private databaseprovider: DatabaseProvider) {
    this.Users = this.databaseprovider.User;
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadPastMed();
      }
    })
  }
  loadPastMed(){
    let TempNow = new Date();
    this.databaseprovider.getAllMed().then(data => {
      this.Med = data;
      console.log(this.Med)
      let L = this.Med.length;
      for (var i=0; i<L; i+=1){
        let LastSched = new Date (this.Med[i].LastSched) 
        if(LastSched <= TempNow){
          this.CurrentMed.push(this.Med[i])
          console.log("CurrentMed")
          console.log(this.CurrentMed)
        }
      }
    })
  }

  Click(Med){

    let start = moment(Med.Start).format('ll');
    let end = moment(Med.LastSched).format('ll');

    let msg = "Dosage: " + Med.Dosage +
              "<br><br>for "+ Med.Duration+" days every "+ Med.Interval+ " " + "Hour/s" +
              "<br><br>From:   "+ start + 
              "<br>To:" + end +
              "<br><br>Reason for Taking: " + Med.Reason+
              "<br><br>Side Effect: " + Med.SideEffect+
              "<br><br>Note: "+ Med.Note;
    let alert = this.alertCtrl.create({
      title: "Medicine: " + Med.MedicineName,
      subTitle: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
      
    })
    alert.present();
  }
}
