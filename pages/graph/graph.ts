import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage {
  Users = [];
  History = [];

  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider) {
    this.Users = this.databaseprovider.User;
  }

  Modal(Title){
    console.log(Title)
    let modal = this.modalCtrl.create('GraphModalPage', {Title: Title});
    modal.present();
  }

}
