import { Component } from '@angular/core';
import { NavController,NavParams,ActionSheetController, AlertController, Platform  } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { UpdatePeoplePage } from '../../pages/update-people/update-people';
import { ManagePeoplePage } from '../../pages/manage-people/manage-people';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Users = [];
  Fname: string = null;
  data: Array<{title: string, value: string, unit: string}>;
  data1: Array<{title: string, value: string, value2: string,  unit: string}>;
  data2: Array<{title: string, value: string}>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform, 
    public alertCtrl: AlertController,
    private databaseprovider: DatabaseProvider, 
    public actionSheetCtrl: ActionSheetController,
    ){
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadLastOpenned();
      }
    })
  }
 

  loadLastOpenned(){
  
    this.databaseprovider.getLast().then(data => {
      try{
    this.Users = data;
    this.Fname = this.Users[0].Fname;
      this.data =[
        {title: 'Contact', value: this.Users[0].PhoneNo, unit: ''},
        {title: 'Weight', value: this.Users[0].Weight, unit: "kg"},
        {title: 'Height', value: this.Users[0].Height, unit: "cm"},
        {title: 'Blood Sugar', value: this.Users[0].BloodSugar, unit: "mmol/L"},
      ];
      this.data1 =[
        {title: 'Blood Pressure', value: this.Users[0].BPSystolic, value2: this.Users[0].BPdiastolic, unit:  "mmHg" },
      ];
      this.data2 =[
        {title: 'Drug Allergy', value: this.Users[0].DrugAllergy},
              ];
            }catch(err){
              this.navCtrl.setRoot(ManagePeoplePage)
            }
    })
 
  }
  Update(title, value){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Action',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            let update = {
              title: title, 
              value: value,
              Id: this.Users[0].UserId,
              set: null,
              Desc: "Update"
            };
            this.navCtrl.push(UpdatePeoplePage, update);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            let edit = {
              title: title, 
              value: value,
              Id: this.Users[0].UserId,
              set: null,
              Desc: "Edit"
            };
            this.navCtrl.push(UpdatePeoplePage, edit);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  Update1(title, value, value1){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Action',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            let update = {
              title: title, 
              value1: value, 
              value2: value1,
              Id: this.Users[0].UserId, 
              set: '1',
              Desc: "Update"
            };
        
            this.navCtrl.push(UpdatePeoplePage, update);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            let edit = {
              title: title, 
              value1: value, 
              value2: value1,
              Id: this.Users[0].UserId, 
              set: '1',
              Desc: "Update"
            };
        
            this.navCtrl.push(UpdatePeoplePage, edit);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

}