import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssessmentViewPage } from './assessment-view';

@NgModule({
  declarations: [
    AssessmentViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AssessmentViewPage),
  ],
})
export class AssessmentViewPageModule {}
