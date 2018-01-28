import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GraphPage } from '../../pages/graph/graph';
import { WeeklyChartPage } from '../../pages/weekly-chart/weekly-chart';
import { MonthlyChartPage } from '../../pages/monthly-chart/monthly-chart';

@IonicPage()
@Component({
  selector: 'page-chart-holder',
  templateUrl: 'chart-holder.html',
})
export class ChartHolderPage {


  tab1Root: any = GraphPage;
  tab2Root: any = WeeklyChartPage;
  tab3Root: any = MonthlyChartPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



}
