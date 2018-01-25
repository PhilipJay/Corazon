import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';

//Plugin
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { SMS } from '@ionic-native/sms';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgCalendarModule  } from 'ionic2-calendar';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatabaseProvider } from '../providers/database/database';

//Page
import { HomePage } from '../pages/home/home';
import { GraphPage } from '../pages/graph/graph';
import { ManagePeoplePage } from '../pages/manage-people/manage-people';
import { GalleryPage } from '../pages/gallery/gallery';
import { MedicationPage } from '../pages/medication/medication';
import { MedicationHolderPage } from '../pages/medication-holder/medication-holder';
import { PastMedicationPage } from '../pages/past-medication/past-medication';
import { InsertUserDataPage } from '../pages/insert-user-data/insert-user-data';
import { UpdatePeoplePage } from '../pages/update-people/update-people';
import { AssessmentPage } from '../pages/assessment/assessment';
import { CalendarPage } from '../pages/calendar/calendar';
import { ScheduleHolderPage } from '../pages/schedule-holder/schedule-holder';
import { GalleryFolderPage } from '../pages/gallery-folder/gallery-folder';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GraphPage,
    ManagePeoplePage,
    CalendarPage,
    GalleryPage,
    MedicationPage,
    InsertUserDataPage,
    UpdatePeoplePage,
    AssessmentPage,
    GalleryFolderPage,
    MedicationHolderPage,
    PastMedicationPage,
    ScheduleHolderPage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GraphPage,
    ManagePeoplePage,
    GalleryPage,
    CalendarPage,
    MedicationPage,
    InsertUserDataPage,
    UpdatePeoplePage,
    AssessmentPage,
    GalleryFolderPage,
    MedicationHolderPage,
    PastMedicationPage,
    ScheduleHolderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    SMS,
    BackgroundMode,
    Network,
    Geolocation,
    LocalNotifications,
    DatabaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
