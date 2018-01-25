import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryFolderPage } from './gallery-folder';

@NgModule({
  declarations: [
    GalleryFolderPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryFolderPage),
  ],
})
export class GalleryFolderPageModule {}
