import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myLogs = {};
  orgLogs = {};
  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.getUserLogs();
  	this.getOrgLogs();
  }

  getUserLogs(){
  	this.userService.getMyLogs().then((res) => {
  		this.myLogs = res;
  		console.log(this.myLogs);
  	}, (err) => {
  		console.log(err);
  	})
  }

  getOrgLogs(){
  	this.userService.getAllLogs().then((res) => {
  		this.orgLogs = res;
  		console.log(this.orgLogs);
  	}, (err) => {
  		console.log(err);
  	})
  }

}
