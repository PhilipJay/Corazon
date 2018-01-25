import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssessmentPage } from './assessment';

@NgModule({
  declarations: [
    AssessmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AssessmentPage),
  ],
})
export class AssessmentPageModule {}
