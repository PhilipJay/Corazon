import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Platform, ToastController,ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { DatabaseProvider } from './../../providers/database/database';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AssessmentPage } from '../../pages/assessment/assessment';

declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-sched',
  templateUrl: 'sched.html',
})
export class SchedPage {

  Msg: string;
  selectedDay = new Date();
  Users = [];
  Sched = [];
  data: any;
  Now: String = new Date().toISOString();
  TempNow = new Date();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private databaseprovider: DatabaseProvider,
    private plt: Platform, 
    private toastCtrl: ToastController,
    public backgroundMode : BackgroundMode,
    public viewCtrl: ViewController,
    private localNotifications: LocalNotifications) { 

      // load sched
      this.databaseprovider.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.loadUserSched();
        }
      })
      //notification
      this.plt.ready().then((readySource) => {
        this.localNotifications.on('click', (notification, state) => {
          let json = JSON.parse(notification.data);
     
          let alert = alertCtrl.create({
            title: notification.title,
            subTitle: json.mydata
          });
          alert.present();
        })
      });
      this.Users = this.databaseprovider.User;
    }

    loadUserSched(){
      this.databaseprovider.getSchedule().then(data => {
        this.Sched = data;
        let L = this.Sched.length;
        let TempNow = new Date();
        for (var i=0; i<L; i+=1){
            this.Sched[i].Calendar = moment(this.Sched[i].Start).calendar();
            // let start = new Date(this.Sched[i].Start)
            let end = new Date(this.Sched[i].End)
            if( end < TempNow){
              this.databaseprovider.AddAssessment(this.Sched[i])
              this.databaseprovider.DeleteSched(this.Sched[i].ScheduleId)
              this.loadUserSched();
             }
        }
        
      })
    }

  //   scheduleNotification(first, second, last, event) {
  //     let Fid = first.getTime() + this.Users[0].UserId;
  //     let Sid = second.getTime() + this.Users[0].UserId;
  //     let Lid = last.getTime() + this.Users[0].UserId;
  //     let endtime = new Date(event.endTime)
  //     let Aid = endtime.getTime() + this.Users[0].UserId;
 
  //       this.localNotifications.schedule([{
  //       id: parseInt(Fid),
  //       title: event.title,
  //       text: '8 hours before your appointment at '+ event.place,
  //       data: { mydata: event.note },
  //       at: (new Date(first)),
  //     },{
  //       id: parseInt(Sid),
  //       title: event.title,
  //       text: '3 hours before your appointment at '+ event.place,
  //       data: { mydata: event.note },
  //       at: (new Date(second))
  //    },{
  //     id: parseInt(Lid),
  //     title: event.title,
  //     text: '1 hours before your appointment at '+ event.place,
  //     data: { mydata: event.note },
  //     at: (new Date(last))
  //  },{
  //   id: parseInt(Aid),
  //   title: event.title,
  //   text: 'Are you ready to Fillup your Assessment for Todays Appointment?',
  //   at: (new Date(endtime))
  //  }
  // ]);
  //   }

  // addEvent() {
  //   this.selectedDay = new Date();
  //   let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
  //   modal.present();
  //   modal.onDidDismiss(data => {  

  //     if (data) {
  //       let eventData = data;
  //       let start = new Date(eventData.startTime)
  //         let first = (new Date(start.getTime() - 28800000 )) // 8 hours 28800000
  //         let second = (new Date(start.getTime() - 10800000 )) // 3 hours 10800000
  //         let last = (new Date(start.getTime() - 3600000 )) // 1 hour 3600000
  //         this.scheduleNotification(first,second,last,eventData);
  //        this.databaseprovider.AddSchedule(this.Users[0].UserId, eventData.title, eventData.startTime, first, second, last, eventData.endTime, eventData.place, eventData.note)
  //        this.presentToast('Add Successful')
  //        this.loadUserSched();
  //        this.app.getRootNav().getActiveChildNav().select(1);
  //     }
  //   });
    
  // }
  onEventSelected(event) {

    let start = moment(event.Start).format('llll');
    let end = moment(event.End).format('llll');
    
    let alert = this.alertCtrl.create({
      title: '' + event.Title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: [
        {
          text: 'Cancel Schedule',
          role: 'cancel',
          handler: () => {
            

            let Fid = parseInt(new Date(event.First).getTime() + this.Users[0].UserId);
            let Sid = parseInt(new Date(event.Second).getTime() + this.Users[0].UserId);
            let Lid = parseInt(new Date(event.Last).getTime() + this.Users[0].UserId);
            let endtime = new Date(event.End)
            let Aid = parseInt(endtime.getTime() + this.Users[0].UserId);

           this.databaseprovider.DeleteSched(event.ScheduleId)
           cordova.plugins.notification.local.cancel([Fid, Sid, Lid, Aid], function() {
            
           });
          this.presentToast('Cancel Success')
          this.loadUserSched();
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
      
    })
    alert.present();
  }
  
  assess(){
    this.navCtrl.push(AssessmentPage);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: 'top',
      cssClass: "toast"
    });
    toast.present();
  }
  back() {
    this.viewCtrl.dismiss();
  }
}


