import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  Users = [];
  gallery = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private databaseprovider: DatabaseProvider,   public alertCtrl: AlertController) {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadUserGallery();
      }
    })
    this.Users = this.databaseprovider.User;
  }

  loadUserGallery(){
    this.databaseprovider.getGallery().then(data => {
      this.gallery = data;
    })
  }

  AddFolder(){
    let addListAlert = this.alertCtrl.create({
      title: 'Create New Folder',
      message: 'Folder Name',
      inputs: [
        {
          name: 'Folder',
          placeholder: 'Folder Name',

        },
        {
          name: 'Desc',
          placeholder: 'Description',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'Add',
          handler: data => {
            this.databaseprovider.AddGallery(this.Users[0].UserId, data)
            this.loadUserGallery();
          }
        }
      ]
    });
    addListAlert.present();
    
  }

}
