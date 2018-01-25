import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertUserDataPage } from './insert-user-data';

@NgModule({
  declarations: [
    InsertUserDataPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertUserDataPage),
  ],
})
export class InsertUserDataPageModule {}
