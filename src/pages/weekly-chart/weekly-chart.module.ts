import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeeklyChartPage } from './weekly-chart';

@NgModule({
  declarations: [
    WeeklyChartPage,
  ],
  imports: [
    IonicPageModule.forChild(WeeklyChartPage),
  ],
})
export class WeeklyChartPageModule {}
