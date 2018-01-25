import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-assessment-view',
  templateUrl: 'assessment-view.html',
})
export class AssessmentViewPage {
  Title: string;
  Place: string;
  Note: string;
  Dated: string;
  Complaint: string = "";
  Assessment: String = "";
  Id: string;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.Title = this.navParams.get('Title');
    this.Place = this.navParams.get('Address');
    this.Dated = this.navParams.get('Calendar');
    this.Note = this.navParams.get('Note');
    this.Complaint = this.navParams.get('Complaint');
    this.Assessment = this.navParams.get('Assessment');
    this.Id = this.navParams.get('AssessmentId');

  
  }
  cancel(){
    this.viewCtrl.dismiss();
  }
  Save(){
      let data = {
        Ass: this.Assessment,
        Com: this.Complaint,
        Id: this.Id
      }
    this.viewCtrl.dismiss(data);
   
  }
//Gawin ko na lang modal


}
