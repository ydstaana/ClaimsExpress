import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { ClaimService } from '../claim.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  filesToUpload: Array<File>;
  fileData: String;

  constructor(private uploadService: UploadService, private claimService: ClaimService, private router: Router) { 
    this.filesToUpload = [];
  }

  ngOnInit() {
  }

  upload(){
    const formData : any = new FormData();
    const files =  this.filesToUpload;

    console.log("form data variable : " + formData.toString());

    for(var i = 0; i < files.length; i++) {
      formData.append("uploads", files[i], files[i].name);
    }
    console.log(formData);
  	this.uploadService.uploadClaim(formData).then((result) => {
      // this.router.navigate(['/claims']);
    }, (err) => {
      console.log(err);
    });
  }

  
  uploadClaim() {
    this.claimService.uploadClaim(this.fileData);
  };

   fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>> fileInput.target.files;
    }

  
}
