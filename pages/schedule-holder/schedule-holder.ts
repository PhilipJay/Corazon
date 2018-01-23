import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssessmentPage } from '../../pages/assessment/assessment';
import { CalendarPage } from '../../pages/calendar/calendar';

@IonicPage()
@Component({
  selector: 'page-schedule-holder',
  templateUrl: 'schedule-holder.html',
})
export class ScheduleHolderPage {

  tab1Root: any = CalendarPage;
  tab2Root: any = AssessmentPage;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
