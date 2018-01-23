import { Component } from '@angular/core';
import { NavController, NavParams,  ModalController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AssessmentPage } from '../../pages/assessment/assessment';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',                               
})
export class CalendarPage {

  Msg: string;
  selectedDay = new Date();
  Users = [];
  Sched = [];
  data: any;
  Now: String = new Date().toISOString();
  TempNow = new Date();

  //New 

  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
      mode: 'month',
      currentDate: new Date()
  }; // these are the variable used by the calendar.

  //NewEnd

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private modalCtrl: ModalController, 
    private databaseprovider: DatabaseProvider,
    private toastCtrl: ToastController,
    public backgroundMode : BackgroundMode,
    private localNotifications: LocalNotifications) { 

      // load sched
      this.databaseprovider.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.loadEvents();
        }
      })
      //notification
      this.Users = this.databaseprovider.User;
    }

   

    scheduleNotification(first, second, last, event) {
      let Fid = first.getTime() + this.Users[0].UserId;
      let Sid = second.getTime() + this.Users[0].UserId;
      let Lid = last.getTime() + this.Users[0].UserId;
      let endtime = new Date(event.endTime)
      let Aid = endtime.getTime() + this.Users[0].UserId;
 
        this.localNotifications.schedule([{
        id: parseInt(Fid),
        title: event.title,
        text: '8 hours before your appointment at '+ event.place,
        data: { mydata: event.note },
        at: (new Date(first)),
      },{
        id: parseInt(Sid),
        title: event.title,
        text: '3 hours before your appointment at '+ event.place,
        data: { mydata: event.note },
        at: (new Date(second))
     },{
      id: parseInt(Lid),
      title: event.title,
      text: '1 hours before your appointment at '+ event.place,
      data: { mydata: event.note },
      at: (new Date(last))
   },{
    id: parseInt(Aid),
    title: event.title,
    text: 'Are you ready to Fillup your Assessment for Todays Appointment?',
    at: (new Date(endtime))
   }
  ]);
    }

  addEvent() {
    this.selectedDay = new Date();
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {

      if (data) {
        let eventData = data;
        let start = new Date(eventData.startTime)
          let first = (new Date(start.getTime() - 28800000 )) // 8 hours 28800000
          let second = (new Date(start.getTime() - 10800000 )) // 3 hours 10800000
          let last = (new Date(start.getTime() - 3600000 )) // 1 hour 3600000
          this.scheduleNotification(first,second,last,eventData);
         this.databaseprovider.AddSchedule(this.Users[0].UserId, eventData.title, eventData.startTime, first, second, last, eventData.endTime, eventData.place, eventData.note)
         this.presentToast('Add Successful')
         this.loadEvents();
        
      }
    });
  }
  // Cancel(event) {

  //   let start = moment(event.startTime).format('llll');
  //   let end = moment(event.endTime).format('llll');
    
  //   let alert = this.alertCtrl.create({
  //     title: '' + event.Title,
  //     subTitle: 'From: ' + start + '<br>To: ' + end,
  //     buttons: [
  //       {
  //         text: 'Cancel Schedule',
  //         role: 'cancel',
  //         handler: () => {
            

  //           let Fid = parseInt(new Date(event.First).getTime() + this.Users[0].UserId);
  //           let Sid = parseInt(new Date(event.Second).getTime() + this.Users[0].UserId);
  //           let Lid = parseInt(new Date(event.Last).getTime() + this.Users[0].UserId);
  //           let endtime = new Date(event.End)
  //           let Aid = parseInt(endtime.getTime() + this.Users[0].UserId);

  //          this.databaseprovider.DeleteSched(event.ScheduleId)
  //          cordova.plugins.notification.local.cancel([Fid, Sid, Lid, Aid], function() {
            
  //          });
  //         this.presentToast('Cancel Success')
  //          this.loadEvents();
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: () => {
  //           console.log('Buy clicked');
  //         }
  //       }
  //     ]
      
  //   })
  //   alert.present();
  // }
  
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

  loadEvents() {

    this.databaseprovider.getSchedule().then(data => {
      this.Sched = data;
      let L = this.Sched.length;
      var events = [];
      let TempNow = new Date();
      for (var i=0; i<L; i+=1){
          let start = new Date(this.Sched[i].Start)
          let end = new Date(this.Sched[i].End)
          if( end < TempNow){
                this.databaseprovider.AddAssessment(this.Sched[i])
                this.databaseprovider.DeleteSched(this.Sched[i].ScheduleId)
                this.loadEvents();
           }
           else {
              events.push({
                title: this.Sched[i].Title,
                startTime: start,
                endTime: end,
                allDay: false
              });
           }
      }

      console.log(events);
      this.eventSource = events;
    })
}
onViewTitleChanged(title) {
    this.viewTitle = title;
}
onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
}
today() {
    this.calendar.currentDate = new Date();
}
onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
}
onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
}

onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
}
markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
};
DeleteEvent(){
  let modal = this.modalCtrl.create('SchedPage');
  modal.present();
  modal.onDidDismiss(data => {
    this.loadEvents();
  })    
}

}


