import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedPage } from './sched';

@NgModule({
  declarations: [
    SchedPage,
  ],
  imports: [
    IonicPageModule.forChild(SchedPage),
  ],
})
export class SchedPageModule {}
