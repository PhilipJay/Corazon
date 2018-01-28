import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
 
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
 
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString() };
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,  private toastCtrl: ToastController) {

    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
   if (this.event['title'] != null && this.event['place'] != null){
     if (this.event.startTime < this.event.endTime)
         this.viewCtrl.dismiss(this.event);
     else{
      this.presentToast('Please Higher End Date')
     }
   }
   else{
    this.presentToast('Fill Out All The Field')
   }
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top',
      cssClass: "toast"
    });
    toast.present();
  }
}