import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePeoplePage } from './update-people';

@NgModule({
  declarations: [
    UpdatePeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePeoplePage),
  ],
})
export class UpdatePeoplePageModule {}
