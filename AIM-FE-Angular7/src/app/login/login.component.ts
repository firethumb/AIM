import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor() { }

  ngOnInit() {
  }
  fn_login() {
    console.log('login!!!!');
    //this.authenticationService.login(this.model.username, this.model.password);
  }

}
