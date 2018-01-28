import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartHolderPage } from './chart-holder';

@NgModule({
  declarations: [
    ChartHolderPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartHolderPage),
  ],
})
export class ChartHolderPageModule {}
