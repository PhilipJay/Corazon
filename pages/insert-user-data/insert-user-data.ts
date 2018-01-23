import { Component } from '@angular/core';
import  {Events } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { HomePage } from '../../pages/home/home';

import { DatabaseProvider } from './../../providers/database/database';
import { SMS } from '@ionic-native/sms';
import { ManagePeoplePage } from '../../pages/manage-people/manage-people';

import {
  NavController, 
  ActionSheetController, 
  ToastController, 
  Platform, 
  LoadingController, 
  Loading, 
  NavParams } from 'ionic-angular';
 
declare var cordova: any;

@Component({
  selector: 'page-insert-user-data',
  templateUrl: 'insert-user-data.html',
})
export class InsertUserDataPage {

  lastImage: string = null;
  loading: Loading;
  Fname: string = null;
  UserID: number = null;
  User = {};
  Height: any;
  Weight: any;
  BSugar: any;
  BPTop: any;
  BPDown: any;

  constructor(public navCtrl: NavController, 
    private camera: Camera,
    public events: Events,
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private SMS: SMS,
    private databaseprovider: DatabaseProvider) {
      this.Fname = this.navParams.get('Fname');
      
    }

    addUser() {
      if (this.User['Gender'] != null && this.User['Birthday'] != null && this.User['PhoneNo'] != null &&
          this.User['Weight'] != null && this.User['Height'] != null &&
          this.User['DAllergy'] != null && this.User['BSugar'] != null &&
          this.User['BPTop'] != null && this.User['BPDown'] != null)
        {
            let Now: String = new Date().toISOString();
            this.databaseprovider.addUser(
              this.Fname,
              this.User['Gender'], 
              this.User['Birthday'],
              this.User['PhoneNo'],
              parseFloat(this.User['Weight']),
              parseFloat(this.User['Height']),
              this.User['DAllergy'],
              this.User['BSugar'],
              this.User['BPTop'],
              this.User['BPDown'],
              Now)
              
              console.log("KG " + this.User['Weight'])
              this.Weight = this.User['Weight'];
              this.Height = this.User['Height'];
              this.BSugar = this.User['BSugar'];
              this.BPTop = this.User['BPTop'];
              this.BPDown = this.User['BPDown'];
              console.log("Kilo " + this.Weight)

              this.presentToast('Add Successful')
              this.databaseprovider.getLatestUser().then(data => {
                let UserId = data;
                console.log("Kilo99 " + this.Weight)
                    this.databaseprovider.addUserHistory(UserId[0].UserId, "Weight", this.Weight, Now);
                    this.databaseprovider.addUserHistory(UserId[0].UserId, "Height", this.Height, Now);
                    this.databaseprovider.addUserHistory(UserId[0].UserId, "Blood Sugar", this.BSugar, Now);
                    this.databaseprovider.addUserHistory1(UserId[0].UserId, "Blood Pressure", this.BPTop, this.BPDown, Now);
            })
              let Msg = "Hello " + this.Fname + ", your account is now registered to #CorazonApp, you may receive text message from this number as a notification"
            this.sendTextMessage(this.User['PhoneNo'], Msg)
            // every Change, every data, it would text the user
            // let Msg2 = "Your latest info:<br>Height: "+ this.User['Height']

            this.submitEvent(this.Fname);
            this.User = {};
            this.navCtrl.setRoot(HomePage);
        }
        else {
          this.presentToast('Fill Out All The Field')
        }
    }

    Cancel(){
      this.navCtrl.push(ManagePeoplePage);
    }

    sendTextMessage(Phone, Msg) {
      this.SMS.send(Phone, Msg).then((result) => {
        
      }, (error) => {
        console.log("Not Okay")
         })

    }

    submitEvent(Fname){
      this.events.publish('UpdateName', Fname);
    }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 1900,
    position: 'top',
    cssClass: "toast"
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    // console.log(cordova.file.dataDirectory + img);
    return cordova.file.dataDirectory + img;
  }
}
public uploadImage() {
  // Destination URL
  var url = "http://localhost:8080/upload/upload.php";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}
}

