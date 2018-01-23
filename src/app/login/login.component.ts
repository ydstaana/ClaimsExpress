import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   constructor(private userService: UserService, private router: Router) { }
  user = {}
  ngOnInit() {
  }

  login(){
  	this.userService.verifyUser(this.user).then((res) => {
      if(Object.keys(res).length == 0) console.log("empty") 
      else{
      	// this.router.navigate(['/claims']);
      }	
      
    }, (err) => {
      console.log(err);
    });
  }

 

}
