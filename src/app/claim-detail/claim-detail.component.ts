import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from '../claim.service';


@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {

  claim = {};

  constructor(private router: Router, private route: ActivatedRoute, private claimService: ClaimService) { }

  ngOnInit() {
    this.getClaimDetail(this.route.snapshot.params['id']);
  }

  getClaimDetail(id) {
    this.claimService.showClaim(id).then((res) => {
      this.claim = res;
      console.log(this.claim);
    }, (err) => {
      console.log(err);
    });
  }

  deleteClaim(id) {
  this.claimService.deleteClaim(id).then((result) => {
    this.router.navigate(['/claims']);
  }, (err) => {
    console.log(err);
  });
}

}