import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-graph-modal',
  templateUrl: 'graph-modal.html',
})
export class GraphModalPage {

  Title: string = null;
  Users = [];
  Record = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private databaseprovider: DatabaseProvider) {
    this.Users = this.databaseprovider.User;
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.Title = this.navParams.get('Title');
        this.loadRecord(this.Title);
      }
    })
    
  }

  Back(){
    this.viewCtrl.dismiss();
  }

  loadRecord(Title){
  
    this.databaseprovider.getRecord(Title).then(data => {
      this.Record = data;
      let L = this.Record.length
      for (var i=0; i<L; i+=1){
      this.Record[i].DateInserted = moment(this.Record[i].DateInserted).format('lll');
      }
      console.log(this.Record)

    })
  }


}
