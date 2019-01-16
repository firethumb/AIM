import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
    private userSrv: UserService,
    private router: Router
  ){}
  ngOnInit(){
  }
  fn_login(){
    console.log('login!',this.model);
    this.userSrv.login(this.model).subscribe(
        data =>{
          if(data.status == 200){
            let obj = JSON.parse(data._body);
            localStorage.setItem('beJWT', obj.id);
            localStorage.setItem('UID', obj.userId);
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('username', this.model.username);
            this.model = [];
            this.router.navigate(['/']);
          }
        },
        error =>{
//              console.log('error._body: ', JSON.parse(error._body));
          swal({
            type: 'error',
            title: 'Oops... Error status:' + error.status + ' ( '+error.statusText+' )',
            text: JSON.parse(error._body).error.message,
          });
        }
      );
  }
}
