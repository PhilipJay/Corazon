import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthlyChartPage } from './monthly-chart';

@NgModule({
  declarations: [
    MonthlyChartPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthlyChartPage),
  ],
})
export class MonthlyChartPageModule {}
