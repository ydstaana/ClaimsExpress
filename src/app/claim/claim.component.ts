import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../claim.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment/src/moment';
// import { csv } from '@angular/common';

// var session = require('express-session');

// const csv = require('csvtojson')
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claims: any;
  claim = {};
  hasSearched =false;
  input: String
  
  // String filecsv = "";

  constructor(private route: ActivatedRoute, private router: Router, private claimService: ClaimService, private userService: UserService) { }

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

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}

  

