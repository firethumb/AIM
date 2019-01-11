import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  constructor() { }

  ngOnInit() {
  }
  fn_signup() {
    console.log('SignUp!!!!');
    //this.authenticationService.login(this.model.username, this.model.password);
  }
}
