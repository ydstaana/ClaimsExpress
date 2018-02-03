import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment/src/moment';

@Component({
  selector: 'app-myclaims',
  templateUrl: './myclaims.component.html',
  styleUrls: ['./myclaims.component.css']
})
export class MyclaimsComponent implements OnInit {
  claims: any;
  myclaims: any;
  claim = {};
  hasSearched =false;
  input: String
  id: String

   constructor(private route: ActivatedRoute, private router: Router, private claimService: ClaimService, private userService: UserService) { 

   }

  ngOnInit() {
    this.id = this.userService.getCurrentUser();
    console.log("hEYHEHEHEHE" + this.id);
    this.getMyClaimList(this.id);
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

  setSearch(){
    this.hasSearched = true;
    console.log("CLICKED")
  }

  getSearchClaims() {
    this.claimService.getAllClaims().then((res) => {
      this.claims = res;
      this.claimService.searchClaim(this.input).then((res) => {
        this.claims = res;
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
   

  }

  getMyClaimList(id) {
    this.claimService.getAllMyClaims(id).then((res) => {
      this.myclaims = res;
    }, (err) => {
      console.log(err);
    });
    
  }

  deleteClaim(id) {
    this.claimService.deleteClaim(id).then((result) => {
      this.router.navigate(['/myclaims']);
      this.getMyClaimList(id);
    }, (err) => {
      console.log(err);
    });
  }

}
  

  


