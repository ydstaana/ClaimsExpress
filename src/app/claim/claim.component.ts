import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claims: any;
  claim = {};

  constructor(private route: ActivatedRoute, private router: Router, private claimService: ClaimService) { }

  ngOnInit() {
    this.getClaimList();
    // this.getClaimDetail(this.route.snapshot.params['id']);
  }

  getClaimDetail(id) {
    this.claimService.showClaim(id).then((res) => {
      this.claim = res;
      console.log(this.claim);
    }, (err) => {
      console.log(err);
    });
  }

  getClaimList() {
    this.claimService.getAllClaims().then((res) => {
      this.claims = res;
    }, (err) => {
      console.log(err);
    });
  }

  deleteClaim(id) {
    this.claimService.deleteClaim(id).then((result) => {
      this.router.navigate(['/claims']);
      this.getClaimList();
    }, (err) => {
      console.log(err);
    });
  }

  
}
