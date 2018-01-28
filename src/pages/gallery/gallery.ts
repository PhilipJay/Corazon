import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  Users = [];
  gallery = [];

  constructor(public navCtrl: NavController, 
              private modalCtrl: ModalController, 
              public navParams: NavParams,
              private databaseprovider: DatabaseProvider,
              public alertCtrl: AlertController) {

      this.databaseprovider.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.LoadFolder();
        }
      })
    this.Users = this.databaseprovider.User;
  }

  LoadFolder(){
    this.databaseprovider.getGalleryFolder().then(data => {
      this.gallery = data;
      console.log("G "+this.gallery)
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
            this.databaseprovider.AddGalleryFolder(data)
            this.LoadFolder();
          }
        }
      ]
    });
    addListAlert.present();
    
  }

  OpenFolder(img){
    console.log("img " + img)
    let modal = this.modalCtrl.create('GalleryFolderPage', img);
    modal.present();
  }

}
