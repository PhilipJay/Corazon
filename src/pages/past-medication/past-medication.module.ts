import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastMedicationPage } from './past-medication';

@NgModule({
  declarations: [
    PastMedicationPage,
  ],
  imports: [
    IonicPageModule.forChild(PastMedicationPage),
  ],
})
export class PastMedicationPageModule {}
