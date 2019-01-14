import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]

})
export class SignupComponent implements OnInit {
  model: any = {};
  constructor(private userSrv: UserService) { }
  ngOnInit() {
  }

  fn_signup() {
    console.log('model: ',this.model);
    if(this.model.password==this.model.cpassword){
      this.userSrv.create(this.model).subscribe((res:Response) =>{
        console.log('res data: ',res);
      });
    }
    //this.authenticationService.login(this.model.username, this.model.password);
  }

}
