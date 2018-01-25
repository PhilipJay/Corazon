import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleHolderPage } from './schedule-holder';

@NgModule({
  declarations: [
    ScheduleHolderPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleHolderPage),
  ],
})
export class ScheduleHolderPageModule {}
