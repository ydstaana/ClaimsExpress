// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-claim-create',
//   templateUrl: './claim-create.component.html',
//   styleUrls: ['./claim-create.component.css']
// })
// export class ClaimCreateComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimService } from '../claim.service';

@Component({
  selector: 'app-claim-create',
  templateUrl: './claim-create.component.html',
  styleUrls: ['./claim-create.component.css']
})
export class ClaimCreateComponent implements OnInit {

  claim = {};

  constructor(private claimService: ClaimService, private router: Router) { }

  ngOnInit() {
  }

  saveClaim() {
    this.claimService.saveClaim(this.claim).then((result) => {
      console.log(this.claim);
      this.router.navigate(['/claims']);
    }, (err) => {
      console.log(err);
    });
  }

}