import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ClaimService } from '../claim.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	myLogs = {};
	orgLogs = {};
	claims: any;
	totalClaims;
	totalActivities;
  constructor(private userService: UserService, private claimService: ClaimService) { }

  ngOnInit() {
  	this.getUserLogs();
		this.getOrgLogs();
		this.getClaimList();
		
  }

  getUserLogs(){
  	this.userService.getMyLogs().then((res) => {
			this.myLogs = res;
			this.totalActivities = Object.keys(this.myLogs).length;
  		console.log(this.myLogs);
  	}, (err) => {
  		console.log(err);
  	})
  }

  getOrgLogs(){
  	this.userService.getAllLogs().then((res) => {
			this.orgLogs = res;
			this.totalClaims = this.claims.length;
  		console.log(this.orgLogs);
  	}, (err) => {
  		console.log(err);
  	})
	}
	
	getClaimList() {
    this.claimService.getAllClaims().then((res) => {
			this.claims = res;
			this.totalClaims = this.claims.length;
			console.log("eyyyyy "  + this.totalClaims);
      console.log(res);
    }, (err) => {
      console.log(err);
    });
    
  }

}
