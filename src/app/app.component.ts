import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,LoadingController, Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SMS } from '@ionic-native/sms';
import { HomePage } from '../pages/home/home';
import { GraphPage } from '../pages/graph/graph';
import { ScheduleHolderPage } from '../pages/schedule-holder/schedule-holder';
import { ChartHolderPage } from '../pages/chart-holder/chart-holder';
import { ManagePeoplePage } from '../pages/manage-people/manage-people';
import { GalleryPage } from '../pages/gallery/gallery';

import { MedicationHolderPage } from '../pages/medication-holder/medication-holder';
import { DatabaseProvider } from './../providers/database/database';
declare var cordova:any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  page: Array<{title: string, component: any, icon: string}>;
  Msg: string;
  timer = [];
  MedSched = [];
  UserId: any;
  Users = [];
  Avatar: string = null;
  Fname: string = null;
  constructor(public platform: Platform, 
    public events: Events,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    private SMS: SMS,
    private databaseprovider: DatabaseProvider) {
    this.initializeApp();
    this.events.subscribe('UpdateName', (Fname, Avatar) =>{
      this.Fname = Fname;
      this.Avatar = Avatar
    })
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadLastOpenned();
      }
    })
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: HomePage, icon: 'person' },
      { title: 'Medication', component: MedicationHolderPage, icon: 'medkit' },
      { title: 'Account', component: ManagePeoplePage, icon: 'people' },
      { title: 'Gallery', component: GalleryPage, icon: 'images' },
      { title: 'Chart', component: ChartHolderPage, icon: 'stats' }
    ];
    this.page = [
      { title: 'Schedule', component: ScheduleHolderPage, icon: 'calendar'}
    ]
  }

LoadSMS(){
  console.log("LoadSMS")
  this.databaseprovider.getAllSched().then(data => {
    let Sched = data;
    let TempNow = new Date();
    this.timer = [];
    let L = Sched.length
    for (var i=0; i<L; i+=1){
      let first = new Date(Sched[i].First)
      let Second = new Date(Sched[i].Second)
      let Last = new Date(Sched[i].Last)
      let address = Sched[i].Address
      let Title = Sched[i].Title
      this.UserId = Sched[i].UserId; // kung anong huli sya lang nababasa

console.log("First")
console.log(first > TempNow)
console.log("Second")
console.log(Second > TempNow)
console.log("Last")
console.log(Last > TempNow)


               if ( first >= TempNow){
                  this.timer.push({ 
                    event: first,
                    UserId: this.UserId,
                    Msg: "Hello, you have 8 hours before your "+ Title +" at " + address
                  });
                  console.log("1st")  // na ooverride kapag may iba na, gawin ko na lang array na magkasama yun Id at Msg
                }
               else if( Second >= TempNow){
                this.timer.push({
                  event: Second,
                  UserId: this.UserId,
                  Msg:  "Hello, you have 3 hours before your "+ Title +" at " + address
                });
                console.log("Second")
              
               }
               else if( Last >= TempNow){
                this.timer.push({ 
                  event: Last,
                  UserId: this.UserId,
                  Msg:  "Hello, you have 1 hours before your "+ Title +" at " + address
                });
                console.log("Last")
                 
               }
        
               console.log(this.timer)
    }
  })
}
getMedSched(){
  console.log("getMedSched")
  this.databaseprovider.getMedicationSMS().then(data => {
    this.MedSched = data;
   console.log(this.MedSched)
   let L = this.MedSched.length
   for (var j=0; j<L; j+=1){
    //  let temp = parseInt(this.MedSched[i].Sched)
    this.MedSched[j].time = new Date(this.MedSched[j].Sched)
   }
   console.log(this.MedSched)
 })
}
sendTextMedSched(MedSched){
  console.log("sendTextMedSched")
  console.log(MedSched)
  this.databaseprovider.database
  let Phone = this.MedSched[0].PhoneNo
  let Msg = "Hello " + MedSched.Username + ", you have 10 minutes to take your " + MedSched.MedName + " " +MedSched.Dosage + ". The side effects is/are " + MedSched.SideEffect+ ". Note: "+ MedSched.Note 
  this.SMS.send(Phone, Msg).then((result) => {
    
  }, (error) => {
    console.log("Not Okay")
     })
}
deleteMedSched(MedSched){
  console.log(MedSched)
  console.log("deleteMedSched")
  this.databaseprovider.deleteMedSched(MedSched.MedSchedId)
}
  sendTextMessage(timer) {
    this.databaseprovider.database
    this.databaseprovider.getUserPhoneNumber(timer.UserId).then(data => {
      let User = data;
    console.log("TEXT")
 
    // Place and Note + static 8 hours before etc
    this.SMS.send(User[0].PhoneNo, timer.Msg).then((result) => {
      
    }, (error) => {
      console.log("Not Okay")
       })
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.splashScreen.hide();
      let temp = this;
      this.platform.registerBackButtonAction(() => {
        document.addEventListener('deviceready', function () {
          cordova.plugins.backgroundMode.setDefaults({ 
              title:  'Corazon',
              text:   'Send SMS automatically'
          });
            
             cordova.plugins.backgroundMode.enable();
              cordova.plugins.backgroundMode.overrideBackButton();
              cordova.plugins.backgroundMode.onactivate = function () {
                
                temp.getMedSched();
                temp.LoadSMS();
                //Set an interval of 60 seconds (1800000 milliseconds)
                setInterval(function () {
                  let Now = new Date()
                    console.log("MedSched")
                    console.log(temp.MedSched)
                  let length = temp.MedSched.length;
                  for (var k=0; k<length; k+=1){
                    let MedSched = new Date(temp.MedSched[k].time)
                    console.log("For")
                    console.log(MedSched)
                    console.log(Now >= MedSched)
                    if(Now >= MedSched){
                      temp.sendTextMedSched(temp.MedSched[k])
                      temp.deleteMedSched(temp.MedSched[k])
                      temp.getMedSched()
                    }
                  }
                  let L = temp.timer.length;
                  console.log(temp.timer)
                  for (var j=0; j<L; j+=1){
                    console.log(temp.timer[j])
                    // dito ko na lang lagay yung Id at msg
                    console.log("forloop");
                     let time = new Date(temp.timer[j].event);
                     console.log(temp.timer[j].Msg)
                     console.log(time)
                     console.log(Now)
                     console.log("Condition To Send Message")
                     console.log(Now >= time);
                    if(Now >= time){
                      console.log("ifstatement");
                      temp.sendTextMessage(temp.timer[j]);
                      temp.LoadSMS();
                    }
                  }
                   Now = new Date();
                }, 60000);
              }
      }, false);
    });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
      // console.log(databaseprovider.User);
     this.nav.setRoot(page.component);

  }

  loadLastOpenned(){
    this.databaseprovider.getLast().then(data => {
      this.Users = data;
      this.Fname = this.Users[0].Fname;
      this.Avatar = this.Users[0].Avatar;
    })
    
  }

  load(page) {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading Please Wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      this.nav.setRoot(page.component);
    }, 500);
  
    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }

}
