import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from '../claim.service';

@Component({
  selector: 'app-claim-edit',
  templateUrl: './claim-edit.component.html',
  styleUrls: ['./claim-edit.component.css']
})
export class ClaimEditComponent implements OnInit {

  claim = {};

  constructor(private claimService: ClaimService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getClaim(this.route.snapshot.params['id']);
  }

  getClaim(id) {
    this.claimService.showClaim(id).then((res) => {
      this.claim = res;
      console.log(this.claim);
    }, (err) => {
      console.log(err);
    });
  }

  updateClaim(id) {
    this.claimService.updateClaim(id, this.claim).then((result) => {
      let id = result['_id'];
      this.router.navigate(['/claim-details', id]);
    }, (err) => {
      console.log(err);
    });
  }

}