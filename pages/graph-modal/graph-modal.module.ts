import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphModalPage } from './graph-modal';

@NgModule({
  declarations: [
    GraphModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphModalPage),
  ],
})
export class GraphModalPageModule {}
