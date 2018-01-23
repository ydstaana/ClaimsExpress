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
  orgOptionsArr = [];
  orgOptionsArray = [];
  orgs = {};
  orgArr= [];

  constructor(private userService: UserService,) { }

  ngOnInit() {
      this.userTypeOptions = [
        {value: 'ENCODER', label: 'Encoder'},
        {value: 'ADMIN', label: 'Admin'},
        {value: 'ORGANIZATION', label: 'Organization'},
        
      ];

      this.searchOrganizationsOptions();
  }

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
      this.orgs = res;
      Object.values(this.orgs).forEach((org) => {
          // key: the name of the object key
          // index: the ordinal position of the key within the object 
          console.log(org)
          this.orgOptionsArr.push({value : org["_id"], label : org["name"]});
      });
        
      }, (err) => {
        console.log(err);
    });

      
  };


  saveUser() {
    this.userService.saveUser(this.user).then((result) => {
      console.log(this.user);
    }, (err) => {
      console.log(err);
    });
  }

 

}

  
