import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
 
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  User = [];
  Medication = [];
 
  constructor(
    public sqlitePorter: SQLitePorter, 
    private storage: Storage, 
    private sqlite: SQLite,
    private platform: Platform, 
    private http: Http) {
      
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }
 
  fillDatabase() {
    this.http.get('assets/dummyDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }

  getGallery(){
    return this.database.executeSql("SELECT * FROM tblGallery WHERE UserId = " + this.User[0].UserId , []).then((data) => {
      let Gallery = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Gallery.push({
                            GalleryId: data.rows.item(i).GalleryId, 
                            FolderName: data.rows.item(i).FolderName,
                            Description:  data.rows.item(i).Description,
                            ImgPath: data.rows.item(i).ImgPath,
                          });
        }           
      }
      return Gallery;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  AddGallery(UserId, gallery){
    let data =[UserId, gallery.Folder, gallery.Desc];
    
    return this.database.executeSql("INSERT INTO tblGallery (UserId,FolderName,Description) VALUES (?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  getAllSched() {
    return this.database.executeSql("SELECT * FROM tblSchedule where UserId = " + this.User[0].UserId, []).then((data) => {
      let Schedule = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Schedule.push({
            ScheduleId: data.rows.item(i).ScheduleId, 
            UserId: data.rows.item(i).UserId, 
            Address: data.rows.item(i).Address, 
            Title: data.rows.item(i).Title, 
            Start: data.rows.item(i).Start, 
            First: data.rows.item(i).First, 
            Second: data.rows.item(i).Second, 
            Last: data.rows.item(i).Last, 
            End: data.rows.item(i).End,
                          });
        }           
      }
      return Schedule;
    }, err => {
      console.log('Error: ', err);
      return [];
    }); 
  }

  getUserPhoneNumber(UserId){
    return this.database.executeSql("SELECT * FROM tblUser Where UserId = "+ UserId, []).then((data) => {
      let User = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          User.push({
                            UserId: data.rows.item(i).UserId, 
                            Fname: data.rows.item(i).Fname, 
                            PhoneNo: data.rows.item(i).PhoneNo,  
                          });
        }           
      }
      return User;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getSchedule(){
    return this.database.executeSql("SELECT * FROM tblSchedule WHERE UserId = " + this.User[0].UserId , []).then((data) => {
      let sched = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          sched.push({
                            ScheduleId: data.rows.item(i).ScheduleId, 
                            Address: data.rows.item(i).Address, 
                            Note: data.rows.item(i).Note,
                            Title: data.rows.item(i).Title, 
                            Start: data.rows.item(i).Start, 
                            First: data.rows.item(i).First, 
                            Second: data.rows.item(i).Second, 
                            Last: data.rows.item(i).Last, 
                            End: data.rows.item(i).End,
                          });
        }           
      }
      return sched;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  AddAssessment(sched){
    let data = [this.User[0].UserId, sched.Title, sched.Address, sched.Note, sched.Start]
    return this.database.executeSql("INSERT INTO tblAssessment (UserId, Title, Address, Note, Dated) VALUES (?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  AddAssessment2(update){
    this.database.executeSql("UPDATE tblAssessment SET Complaint = '" + update.Com + "', Assessment ='" + update.Ass + "'  WHERE AssessmentId = " + update.Id , [])
  }

  getAssessment(){
    return this.database.executeSql("SELECT * FROM tblAssessment WHERE UserId = " + this.User[0].UserId , []).then((data) => {
      let Assessment = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Assessment.push({
            AssessmentId: data.rows.item(i).AssessmentId, 
                Title: data.rows.item(i).Title, 
                Note: data.rows.item(i).Note, 
                Address: data.rows.item(i).Address,
                Dated: data.rows.item(i).Dated,
                Complaint: data.rows.item(i).Complaint,
                Assessment: data.rows.item(i).Assessment
                          });
        }           
      }
      return Assessment;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  AddSchedule(UserId,Title, Start, first, Second, Last, End, Address, Note){
    let data =[UserId,Title, Start, first, Second, Last, End, Address, Note];
    return this.database.executeSql("INSERT INTO tblSchedule (UserId, Title, Start, First, Second, Last, End, Address, Note) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  UserID(UserID){
    this.User = UserID;
  }

  LastOpened(Now,Id){
    this.database.executeSql("UPDATE tblUser SET LastOpened = '" + Now + "' WHERE UserId = " + Id['UserId'] , [])
  }

  getLast(){
    return this.database.executeSql("SELECT * FROM tblUser ORDER BY LastOpened desc limit 1", []).then((data) => {
      let Users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Users.push({
                            UserId: data.rows.item(i).UserId, 
                            Fname: data.rows.item(i).Fname, 
                            Gender: data.rows.item(i).Gender,
                            Birthday: data.rows.item(i).Birthday, 
                            PhoneNo: data.rows.item(i).PhoneNo,
                            DrugAllergy: data.rows.item(i).DrugAllergy, 
                            OtherAllergy: data.rows.item(i).OtherAllergy, 
                            BPSystolic: data.rows.item(i).BPSystolic, 
                            BPdiastolic: data.rows.item(i).BPdiastolic, 
                            BloodSugar: data.rows.item(i).BloodSugar, 
                            Weight: data.rows.item(i).Weight, 
                            Height: data.rows.item(i).Height, 
                            LastUpdated: data.rows.item(i).LastUpdated,
                          });
        }           
      }
      this.User = Users;
      console.log(this.User)
      return Users;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  UpdateUserData(value, Id, Field, Now){
     this.database.executeSql("UPDATE tblUser SET LastUpdated = '" + Now + "'," + Field +"='" +value +"' WHERE UserId =" + Id , [])
   
  }

  UpdateUserData1(value, Id, Field, Now){
     this.database.executeSql("UPDATE tblUser SET LastUpdated = '" + Now + "'," + Field['Top'] +"='" +value['valueTop'] +"'," + Field['Down'] +"='" +value['valueDown'] +"' WHERE UserId = " + Id , [])
  }

  DeleteUser(ID){
     this.database.executeSql("Delete FROM tblUser where UserId = " + ID['UserId'] , [])
     this.database.executeSql("Delete FROM tblMedication where UserId = " + ID['UserId'] , [])
     this.database.executeSql("Delete FROM tblMedSchedule where UserId = " + ID['UserId'] , [])
     this.database.executeSql("Delete FROM tblSchedule where UserId = " + ID['UserId'] , [])
     this.database.executeSql("Delete FROM tblHistory where UserId = " + ID['UserId'] , [])
     this.database.executeSql("Delete FROM tblGallery where UserId = " + ID['UserId'] , [])
     this.database.executeSql("Delete FROM tblAssessment where UserId = " + ID['UserId'] , [])
  }
  DeleteSched(ID){
    return this.database.executeSql("Delete FROM tblSchedule where ScheduleId = " + ID, [])
  }
      addUser(Fname, Gender, Birthday, PhoneNo, Weight, Height, DrugAllergy, BloodSugar, BPSystolic, BPdiastolic,LastUpdated) {
  let data = [Fname, Gender, Birthday, PhoneNo, Weight, Height, DrugAllergy, BloodSugar, BPSystolic, BPdiastolic,LastUpdated, LastUpdated]
   
    return this.database.executeSql("INSERT INTO tblUser (Fname, Gender, Birthday, PhoneNo, Weight, Height, DrugAllergy, BloodSugar, BPSystolic, BPdiastolic, LastUpdated, LastOpened) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

      addUserHistory(UserId, Description, First, DateNow){
        console.log("AddUserHistory");
        let data = [UserId, Description, First, DateNow]
        
         return this.database.executeSql("INSERT INTO tblHistory (UserId, Description, First, DateInserted) VALUES (?, ?, ?, ?)", data).then(data => {
           return data;
         }, err => {
           console.log('Error: ', err);
           return err;
         });
      }

      addUserHistory1(UserId, Description, First, Second, DateNow){
        console.log("AddUserHistory1");
        let data = [UserId, Description, First, Second, DateNow]
         return this.database.executeSql("INSERT INTO tblHistory (UserId, Description, First, Second, DateInserted) VALUES (?, ?, ?, ?, ?)", data).then(data => {
           return data;
         }, err => {
           console.log('Error: ', err);
           return err;
         });
      }

      getLatestUser(){
        return this.database.executeSql("SELECT * FROM tblUser order by UserId DESC limit 1", []).then((data) => {
          let User = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              User.push({
                UserId: data.rows.item(i).UserId, 
               });
            }           
          }
          console.log("getLatestUser")
          console.log(User)
          return User;
        }, err => {
          console.log('Error: ', err);
          return [];
        });
      }
 
  getAllUsers() {
    return this.database.executeSql("SELECT * FROM tblUser", []).then((data) => {
      let developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          developers.push({
                            UserId: data.rows.item(i).UserId, 
                            Fname: data.rows.item(i).Fname, 
                            Gender: data.rows.item(i).Gender,
                            Birthday: data.rows.item(i).Birthday, 
                            PhoneNo: data.rows.item(i).PhoneNo,
                            DrugAllergy: data.rows.item(i).DrugAllergy, 
                            OtherAllergy: data.rows.item(i).OtherAllergy, 
                            BPSystolic: data.rows.item(i).BPSystolic, 
                            BPdiastolic: data.rows.item(i).BPdiastolic, 
                            BloodSugar: data.rows.item(i).BloodSugar, 
                            Weight: data.rows.item(i).Weight, 
                            Height: data.rows.item(i).Height, 
                            LastOpened: data.rows.item(i).LastOpened,
                            LastUpdated: data.rows.item(i).LastUpdated,
                          });
        }           
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  DeleteMed(ID){
    console.log("DeleteMed")
    return this.database.executeSql("Delete FROM tblMedication where MedicationId = " + ID.MedicationId, [])
  }
AddMedicine(Med, LastSched){
  let data = [this.User[0].UserId, Med.Name, Med.Dosage, Med.Duration, Med.Frequency, Med.Begin, Med.Reason, Med.Side, Med.Note, LastSched]
  return this.database.executeSql("INSERT INTO tblMedication (UserId, MedicineName, Dosage, Duration, Interval,Start, Reason, SideEffect,Note, LastSched) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data).then(data => {
    console.log("Ok")
    return data;
  }, err => {
    console.log('Error: ', err);
    return err;
  });
}

  getAllMed() {
    return this.database.executeSql("SELECT * FROM tblMedication where UserId = " + this.User[0].UserId, []).then((data) => {
      let Medication = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Medication.push({
            MedicationId: data.rows.item(i).MedicationId, 
            MedicineName: data.rows.item(i).MedicineName, 
            Dosage: data.rows.item(i).Dosage, 
            SideEffect: data.rows.item(i).SideEffect, 
            Note: data.rows.item(i).Note, 
            Quantity: data.rows.item(i).Quantity,
            Duration: data.rows.item(i).Duration, 
            Interval: data.rows.item(i).Interval, 
            Start: data.rows.item(i).Start, 
            Reason: data.rows.item(i).Reason, 
            LastSched: data.rows.item(i).LastSched, 
                          });
        }           
      }
      console.log("Medication")
      return Medication;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getLatestMed(){
    return this.database.executeSql("SELECT * FROM tblMedication order by MedicationId DESC limit 1", []).then((data) => {
      let Medication = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Medication.push({
            MedicationId: data.rows.item(i).MedicationId, 
           });
        }           
      }
      return Medication;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  

  getRecord() {
    return this.database.executeSql("SELECT * FROM tblHistory where UserId = " + this.User[0].UserId, []).then((data) => {
      let Histori = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Histori.push({
            HistoryId: data.rows.item(i).HistoryId, 
            UserId: data.rows.item(i).UserId, 
            Description: data.rows.item(i).Description, 
            First: data.rows.item(i).First,
            Second: data.rows.item(i).Second,
            DateInserted: data.rows.item(i).DateInserted, 
                          });
        }           
      }
      return Histori;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  AddMedicationSMS(Id ,time, medName, dosage, Username, Phone, Side, Note){
    let data = [this.User[0].UserId, Id, time, medName, dosage,Username, Phone, Side, Note]
    console.log("data")
    console.log(data)
    return this.database.executeSql("INSERT INTO tblMedSchedule (UserId, MedicationId, Sched, MedName, Dosage,Username, PhoneNo, SideEffect ,Note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getMedicationSMS(){
    return this.database.executeSql("SELECT * FROM tblMedSchedule ORDER BY Sched ASC limit 1" , []).then((data) => {
      let User = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          User.push({
            MedSchedId: data.rows.item(i).MedSchedId, 
            Sched: data.rows.item(i).Sched, 
            MedName: data.rows.item(i).MedName, 
            Dosage: data.rows.item(i).Dosage, 
            Username: data.rows.item(i).Username,  
            PhoneNo: data.rows.item(i).PhoneNo, 
            SideEffect: data.rows.item(i).SideEffect, 
            Note: data.rows.item(i).Note, 
                          });
        }           
      }
      return User;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  deleteMedSMS(Id){
    console.log("deleteMedSMS")
    return this.database.executeSql("Delete FROM tblMedSchedule where MedicationId = " + Id.MedicationId  , [])
  }

  deleteMedSched(Id){
    console.log("deleteMedSched")
    return this.database.executeSql("Delete FROM tblMedSchedule where MedSchedId = " + Id  , [])
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
 
}