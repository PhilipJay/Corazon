import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,AlertController, ToastController, LoadingController  } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { LocalNotifications } from '@ionic-native/local-notifications';
declare var cordova:any;
@Component({
  selector: 'page-medication',
  templateUrl: 'medication.html',
})
export class MedicationPage {
  Users = [];
  Med = [];
  CurrentMed = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private localNotifications: LocalNotifications,
    private databaseprovider: DatabaseProvider) {
      this.Users = this.databaseprovider.User;
      this.databaseprovider.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.loadUserMed();
        }
      })
    }
  loadUserMed(){
    let TempNow = new Date();
    this.CurrentMed = [];
    this.databaseprovider.getAllMed().then(data => {
      this.Med = data;
      console.log(this.Med)
      let L = this.Med.length;
      for (var i=0; i<L; i+=1){
        let LastSched = new Date (this.Med[i].LastSched) 
        if(LastSched >= TempNow){
          this.CurrentMed.push(this.Med[i])
          console.log("CurrentMed")
          console.log(this.CurrentMed)
        }
      }
    })
  }

  AddMed(){
    let modal = this.modalCtrl.create('InsertMedicationPage');
    modal.present();
    modal.onDidDismiss(data => {  
      let Med = data
      let Duration = (Med.Duration * 24);
      let L = Duration/Med.Frequency;
      let Hour = Med.Frequency * 3600000
      let add = 0
      let LastSched;

      for (var k=0; k<L; k+=1){
        add+=Hour;
        let start =  new Date(Med.Begin)
        let Begin = (new Date(start.getTime() + add))
        LastSched = new Date(new Date(Begin).getTime()-600000)
      }
        console.log(LastSched)
      
        
          this.databaseprovider.AddMedicine(Med, LastSched);
        add = 0
        for (var n=0; n<L; n+=1){
          add+=Hour;
          let start =  new Date(Med.Begin)
          let Begin = (new Date(start.getTime() + add))
          let Mid =  parseInt(new Date(Begin).getTime() + this.Users[0].UserId);
   
          // new let time = new Date(new Date(Begin).getTime()-600000)
         let time = (new Date(Begin).getTime()-600000)
          
          // get the latest MedId
          this.databaseprovider.getLatestMed().then(data => {
            let MedId = data;
            this.databaseprovider.AddMedicationSMS(MedId[0].MedicationId, time, Med.Name, Med.Dosage,this.Users[0].Fname, this.Users[0].PhoneNo, Med.Side, Med.Note)
          })
          this.localNotifications.schedule([{
            id: Mid,
            title: this.Users[0].Fname+'\'s Medicine',
            text: 'Take Your '+ Med.Name +' in 10 minutes',
            at: (new Date(Begin).getTime()-600000), // minus 10 mins
          }]);
        
       
      }
      this.loading()
      this.loadUserMed();
      // console.log(moment(Med.Begin).format('HH:mm'))
      })
  }

loading(){
  let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: 'Loading Please Wait...'
      });
    
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    }

  DeleteMed(Med){
    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete ' + Med.MedicineName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.databaseprovider.DeleteMed(Med);
            this.databaseprovider.deleteMedSMS(Med)
            let Duration = Med.Duration * 24;
            let L = Duration/Med.Interval;
            let Hour = Med.Interval * 3600000
            let add = 0;
            console.log("Delete")
            console.log(Med)
            console.log(L)
            console.log(Med.Interval)
            console.log(Hour)
            for (var j=0; j<L; j+=1){
             
              add+=Hour;
              let start =  new Date(Med.Start)
              let Begin = (new Date(start.getTime() + add))
              let Mid =  parseInt(new Date(Begin).getTime() + this.Users[0].UserId);
              console.log(Mid)
              cordova.plugins.notification.local.cancel([Mid], function() {
                console.log("Oks")
               });
            }
          
           this.presentToast('Delete Successful')
            this.loadUserMed();
          }
        }
      ]
    });
    alert.present();
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
}
