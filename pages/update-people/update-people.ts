import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-update-people',
  templateUrl: 'update-people.html',
})
export class UpdatePeoplePage {
  title: string = null;
  value: any = null;
  value1: any = null;
  value2: any = null;

  UserId: any = null;
  Desc: any = null;
  i: any = null;
  Users = [];

  constructor(public navCtrl: NavController,  private toastCtrl: ToastController, private databaseprovider: DatabaseProvider, public navParams: NavParams) {
    this.title = this.navParams.get('title');
    this.i = this.navParams.get('set')
    this.UserId = this.navParams.get('Id');
    this.Desc = this.navParams.get('Desc');

    this.value = this.navParams.get('value');
    this.value1 = parseInt(this.navParams.get('value1'));
    this.value2 = parseInt(this.navParams.get('value2'));

    this.Users = this.databaseprovider.User;

  }
  UpdateUserData(){
    let Now: String = new Date().toISOString();
    let Field;
      if (this.title == "Contact"){
         Field = "PhoneNo";
          }
      else if(this.title == "Blood Sugar"){
        Field = "BloodSugar";
      }
      else{
        Field = this.title;
      }
      if (this.value != ""){
        this.databaseprovider.UpdateUserData(this.value, this.UserId, Field, Now);
        console.log(this.Desc)
         if (this.Desc == "Update"){
           if (this.title != "Contact")
          this.databaseprovider.addUserHistory(this.Users[0].UserId, this.title, this.value, Now);
          console.log("Insert to history")
         }
        this.presentToast('Update Successful')
        this.navCtrl.setRoot(HomePage)
      }
      else{
        this.presentToast('Fill Out The Field')
      }
  }
  UpdateUserData1(){
    let Now: String = new Date().toISOString();
    let Field = {
      Top: 'BPSystolic', 
      Down: 'BPdiastolic'
    };
    let value = {
      valueTop: this.value1,
      valueDown: this.value2
    };
    if (this.value1 != "" && this.value2 !=""){
      this.databaseprovider.UpdateUserData1(value, this.UserId, Field, Now );
      console.log(this.Desc)
      if (this.Desc == "Update"){
        this.databaseprovider.addUserHistory1(this.Users[0].UserId, this.title, this.value1, this.value2,Now);
        console.log("Insert to history")
       }
      this.presentToast('Update Successful')
      this.navCtrl.setRoot(HomePage)
    }
    else{
      this.presentToast('Fill Out The Field')
    }
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
