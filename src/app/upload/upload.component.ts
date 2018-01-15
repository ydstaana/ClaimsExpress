import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  claimFile = null;

  constructor(private uploadService: UploadService, private router: Router) { }

  ngOnInit() {
  }

  uploadClaim(){
    const formData : any = new FormData();
    console.log(this.claimFile);
    formData.append("claim", this.claimFile);

    console.log("form data variable : " + formData.toString());

  	this.uploadService.uploadClaim(formData).then((result) => {
      this.router.navigate(['/claims']);
    }, (err) => {
      console.log(err);
    });
  }

  fileChangeEvent(fileInput : any) {
    this.claimFile = fileInput.target;
    console.log(fileInput.target);
  }
}
