import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicationHolderPage } from './medication-holder';

@NgModule({
  declarations: [
    MedicationHolderPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicationHolderPage),
  ],
})
export class MedicationHolderPageModule {}
