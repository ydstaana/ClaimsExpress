import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = {};
  constructor(private userService: UserService,) { }

  ngOnInit() {
  }

  saveUser() {
    this.userService.saveUser(this.user).then((result) => {
      console.log(this.user);
    }, (err) => {
      console.log(err);
    });
  }

}
