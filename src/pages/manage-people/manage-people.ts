import { Component } from '@angular/core';
import { DatabaseProvider } from './../../providers/database/database';
import { NavController, NavParams,AlertController,ActionSheetController,ToastController, Events } from 'ionic-angular';
import { InsertUserDataPage } from '../insert-user-data/insert-user-data';
import { HomePage } from '../../pages/home/home';
import * as moment from 'moment';
@Component({
  selector: 'page-manage-people',
  templateUrl: 'manage-people.html',
})
export class ManagePeoplePage {
  Users = [];
  Today: String = new Date().toISOString();
  Last: any;
  starters: string = "For starters, add the name of the account";
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams, 
     public alertCtrl: AlertController,
     private databaseprovider: DatabaseProvider, 
     private toastCtrl: ToastController,
     public events: Events,
     public actionSheetCtrl: ActionSheetController) {
      
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadUserData();
      }
    })
  }
  Option(Users){
    let actionSheet = this.actionSheetCtrl.create({
      title: Users.Fname,
      buttons: [
        {
          icon: 'folder-open',
          text: 'Open',
          handler: () => {
            // Event
            this.submitEvent(Users.Fname, Users.Avatar);
            let Now: String = new Date().toISOString();
            this.databaseprovider.LastOpened(Now,Users);
            this.navCtrl.setRoot(HomePage,Users);
            this.navCtrl.popToRoot();
          }
        },
        {
          icon: 'trash',
          text: 'Delete',
          handler: () => {
            const alert = this.alertCtrl.create({
              title: 'Confirm Delete',
              message: 'Do you want to delete ' +Users.Fname+ ' account?',
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
                    this.databaseprovider.DeleteUser(Users);
                      this.databaseprovider.getLast().then(data => {
                          this.Users = data;
                          this.submitEvent(this.Users[0].Fname, this.Users[0].Avatar) 
                      })
                   this.presentToast('Delete Successful')
                    this.loadUserData();
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          icon: 'close',
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  loadUserData() {
    this.databaseprovider.getAllUsers().then(data => {
      this.Users = data;
      console.log(this.Users)
      console.log(this.Users[0].Avatar)
      let L = this.Users.length
      for (var i=0; i<L; i+=1){
      this.Users[i].LastUpdated = moment(this.Users[i].LastUpdated).fromNow();
    }
    })
  }

  AddPeople(){
    let addListAlert = this.alertCtrl.create({
      title: 'Create New Account',
      message: this.starters,
      inputs: [
        {
          name: 'Fname',
          placeholder: 'Name',

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'Add',
          handler: data => {
            if (data.Fname != ""){ 
              this.navCtrl.setRoot(InsertUserDataPage, data);
            }
            else{
              this.starters = "Fill Out the Fields";
              this.AddPeople();
            }
          }
        }
      ]
    });
    addListAlert.present();
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

  submitEvent(Fname, Avatar){
    this.events.publish('UpdateName', Fname, Avatar);
  }

}
