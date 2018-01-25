import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html',
})
export class AssessmentPage {

    Users = [];
    assess = [];

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private modalCtrl: ModalController, private databaseprovider: DatabaseProvider, public navParams: NavParams) {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadUserAssess();
      }
    })
    this.Users = this.databaseprovider.User;
  }

  loadUserAssess(){
    this.databaseprovider.getAssessment().then(data => {
      this.assess = data;
    let L = this.assess.length;
    for (var i=0; i<L; i+=1){
    this.assess[i].Calendar = moment(this.assess[i].Dated).calendar();
    }
     })
  }
 
  ViewAssessment(Ass) {
    console.log(Ass)
    let modal = this.modalCtrl.create('AssessmentViewPage', Ass);
    modal.present();
    modal.onDidDismiss(data => {  
      let Assessment = data
      if (Assessment){
      this.databaseprovider.AddAssessment2 (Assessment);
      this.presentToast('Update Successful')
      this.loadUserAssess();
      }
      })
    
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
