import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertMedicationPage } from './insert-medication';

@NgModule({
  declarations: [
    InsertMedicationPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertMedicationPage),
  ],
})
export class InsertMedicationPageModule {}
