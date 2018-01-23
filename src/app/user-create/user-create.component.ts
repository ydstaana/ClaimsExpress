import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = {};
  userTypeOptions = [];
  orgOptions: any;
  option: {};
  optionsArr = [];

  constructor(private userService: UserService,) { }

  ngOnInit() {
      this.userTypeOptions = [
        {value: 'ENCODER', label: 'ENCODER'},
        {value: 'ADMIN', label: 'ADMIN'},
        {value: 'ORGANIZATION', label: 'ORGANIZATION'},
        
      ];

      this.searchOrganizationsOptions();      
  }

  // getSearchClaims() {
  //   this.claimService.getAllClaims().then((res) => {
  //     this.claims = res;
  //     this.claimService.searchClaim(this.input).then((res) => {
  //       this.claims = res;
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   }, (err) => {
  //     console.log(err);
  //   });
   

  // }


  //  var values = res[0];
  //       console.log(values+ "???")
  //       var json_values = JSON.stringify(values);
  //       var temp = JSON.parse(json_values);
  //       this.orgOptions = res;
  //       console.log("CHECK THIS RES" +  temp);
  //       for (var name of this.orgOptions) {
  //         console.log("HELLO PLEASE" + name);
  //         this.optionsArr.push(this.option);
  //       }

   searchOrganizationsOptions(){
    this.userService.getAllOrgs().then((res) => {
       console.log(res);
      }, (err) => {
        console.log(err);
    });

      
  };

  // getClaimList() {
  //   this.claimService.getAllClaims().then((res) => {
  //     this.claims = res;
  //   }, (err) => {
  //     console.log(err);
  //   });
    
  // }

  saveUser() {
    this.userService.saveUser(this.user).then((result) => {
      console.log(this.user);
    }, (err) => {
      console.log(err);
    });
  }


}

  
