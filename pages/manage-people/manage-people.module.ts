import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePeoplePage } from './manage-people';

@NgModule({
  declarations: [
    ManagePeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePeoplePage),
  ],
})
export class ManagePeoplePageModule {}
