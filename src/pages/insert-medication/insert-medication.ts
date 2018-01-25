import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-insert-medication',
  templateUrl: 'insert-medication.html',
})
export class InsertMedicationPage {
  Med = { Begin: new Date().toISOString() };
  today = new Date();
  minDate = new Date().toISOString();

  constructor( public toastCtrl: ToastController, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    let preselectedDate = moment(this.today).format();
    this.Med.Begin = preselectedDate;
 
  }

  AddMed(){
    if (this.Med['Name'] != null && this.Med['Dosage'] != null && this.Med['Duration'] != null && this.Med['Frequency'] != null && 
      this.Med['Begin'] != null && this.Med['Reason'] != null && this.Med['Side'] != null && this.Med['Note'] != null)
    {
         this.viewCtrl.dismiss(this.Med);
    }
    else {
        this.presentToast('Fill Out All The Field')
      }
  }
  cancel(){
    this.viewCtrl.dismiss();
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1900,
      position: 'top',
      cssClass: "toast"
    });
    toast.present();
  }
}
