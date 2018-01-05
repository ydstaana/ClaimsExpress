import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from '../claim.service';

@Component({
  selector: 'app-uploadclaim',
  templateUrl: './uploadclaim.component.html',
  styleUrls: ['./uploadclaim.component.css']
})
export class UploadclaimComponent implements OnInit {

  constructor(private claimService: ClaimService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  // updateClaim(id) {
  //   this.claimService.updateClaim(id, this.claim).then((result) => {
  //     this.router.navigate(['/claim-detail/', id]);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  uploadCSV() {
    this.claimService.uploadCSV()
  }

  

}
