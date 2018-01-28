import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicationPage } from '../../pages/medication/medication';
import { PastMedicationPage } from '../../pages/past-medication/past-medication';

@IonicPage()
@Component({
  selector: 'page-medication-holder',
  templateUrl: 'medication-holder.html',
})
export class MedicationHolderPage {

  tab1Root: any = MedicationPage;
  tab2Root: any = PastMedicationPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
