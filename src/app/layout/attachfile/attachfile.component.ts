import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attachfile',
  templateUrl: './attachfile.component.html',
  styleUrls: ['./attachfile.component.css']
})
export class AttachfileComponent implements OnInit {
  fileSelectMsg = 'No file selected yet.';
  fileUploadMsg = 'No file uploaded yet.';
  uploadFile: boolean ;
  userConsent = 'Yes'
  constructor() {
    this.uploadFile = false;
  }

  ngOnInit() {
  }
  toggleUpload(){
    this.uploadFile = !this.uploadFile;
    if(this.userConsent ==='Yes')
    {
      this.userConsent = 'No';
    } else {
      this.userConsent = 'Yes';
    }
  }
  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  }

  uploadEvent(file: File): void {
    this.fileUploadMsg = file.name;
  }

  cancelEvent(): void {
    this.fileSelectMsg = 'No file selected yet.';
    this.fileUploadMsg = 'No file uploaded yet.';
  }


}
