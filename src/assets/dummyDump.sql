CREATE TABLE IF NOT EXISTS tblUser(
    UserId INTEGER PRIMARY KEY,
    Fname TEXT, 
    Gender TEXT,
    Birthday TEXT,
    PhoneNo Text,
    ProfilePath TEXT,
    DrugAllergy TEXT,
    BPSystolic INTEGER, --top
    BPdiastolic  INTEGER, --down
    BloodSugar REAL,
    Weight REAL,
    Height REAL,
    initialDate TEXT, --newwwwwwwwwwwwwwwwwwwwwwwwwwwww
    LastOpened TEXT,
    LastUpdated TEXT
);

CREATE TABLE IF NOT EXISTS tblMedication(
    MedicationId INTEGER PRIMARY KEY,
    UserId INTEGER, --Foreign
    MedicineName TEXT,
    Dosage TEXT,
    Interval INTEGER,
    Duration INTEGER,
    Start TEXT,
    Reason TEXT,
    SideEffect Text,
    Note TEXT,
    LastSched TEXT,
         FOREIGN KEY (UserId) REFERENCES tblUser(UserId)
);

CREATE TABLE IF NOT EXISTS tblMedSchedule(
   MedSchedId INTEGER PRIMARY KEY,
   UserId INTEGER,
   MedicationId INTEGER,
   Dosage TEXT,
   Sched INTEGER,
   MedName TEXT,
   Username TEXT,
   PhoneNo TEXT,
   SideEffect TEXT,
   Note Text,
   FOREIGN KEY (MedicationId) REFERENCES tblMedication(MedicationId),
   FOREIGN KEY (UserId) REFERENCES tblUser(UserId)
);




CREATE TABLE IF NOT EXISTS tblSchedule(
    ScheduleId INTEGER PRIMARY KEY,
    UserId INTEGER, --Foreign
    Title TEXT,
    Start TEXT, 
    First TEXT,--1st Alarm
    Second TEXT, --2nd Alarm
    Last TEXT,  --3rd Alarm
    End TEXT,
    Address TEXT,
    Note TEXT,
        FOREIGN KEY (UserId) REFERENCES tblUser(UserId)
);

CREATE TABLE IF NOT EXISTS tblHistory(
    HistoryId INTEGER PRIMARY KEY,
    UserId INTEGER, --Foreign
    Description TEXT, --Tell if Height, Weight, Blood Sugar, Blood Pressure
    First INTEGER,
    Second INTEGER,
    DateInserted TEXT,
         FOREIGN KEY (UserId) REFERENCES tblUser(UserId)
);



CREATE TABLE IF NOT EXISTS tblGallery(
    GalleryId INTEGER PRIMARY KEY,
    UserId INTEGER, --Foreign
    FolderName TEXT,
    ImgPath TEXT,
    Description TEXT,
        FOREIGN KEY (UserId) REFERENCES tblUser(UserId)
);

CREATE TABLE IF NOT EXISTS tblAssessment(
    AssessmentId INTEGER PRIMARY KEY,
    UserId INTEGER, --Foreign
    Complaint TEXT,
    Assessment TEXT,
    Note TEXT,
    Title TEXT,
    Address Text,
    Dated TEXT, --1st Alarm
       FOREIGN KEY (UserId) REFERENCES tblUser(UserId)
);




