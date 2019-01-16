import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers:[UserService]
})
export class HeaderComponent implements OnInit {
    public isAuth:boolean;
    constructor(private userSrv: UserService){
      this.isAuth = true;
    }

    ngOnInit() {
    }
    fn_logout(){
        console.log("logout!");
        this.isAuth = !this.isAuth;
        this.userSrv.logout().subscribe(
            data =>{
              console.log("!!!!!!!!!!!!! ", data);
              if(data.ok){
                console.log('stat 200 ',JSON.parse(data._body));
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('UID');
                localStorage.removeItem('beJWT');
                let tmp = localStorage.getItem("username");
                swal({
                  type: 'success',
                  title: 'Logout Successful!',
                  text: tmp
                });
                localStorage.removeItem('username');
              }
            },
            error =>{
                  console.log('error._body: ', JSON.parse(error._body));
                  localStorage.removeItem('isLoggedin');
                  localStorage.removeItem('UID');
                  localStorage.removeItem('beJWT');
            }
          );

    }
}
