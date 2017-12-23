import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claims: any;

  constructor(private claimService: ClaimService) { }

  ngOnInit() {
    this.getClaimList();
  }

  getClaimList() {
    this.claimService.getAllClaims().then((res) => {
      this.claims = res;
    }, (err) => {
      console.log(err);
    });
  }

}
