import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/claim/upload'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public uploader:FileUploader;
  public token:any;
  filesToUpload: Array<File>;

  constructor(private uploadService: UploadService, private router: Router) { 
    this.filesToUpload = [];
    this.token = uploadService.getToken();
    this.uploader = new FileUploader({url : URL, authToken : this.token});
  }

  ngOnInit() {
  }

  /*upload(){
    const formData : any = new FormData();
    const files =  this.filesToUpload;

    console.log("form data variable : " + formData.toString());

    for(var i = 0; i < files.length; i++) {
      formData.append("uploads", files[i], files[i].name);
    }
    console.log(formData);
  	this.uploadService.uploadClaim(formData).then((result) => {
      //this.router.navigate(['/claims']);
    }, (err) => {
      console.log(err);
    });
  }

   fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>> fileInput.target.files;
    }*/

  
}
