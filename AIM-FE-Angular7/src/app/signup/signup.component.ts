import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]

})
export class SignupComponent implements OnInit {
  model: any = {};
  constructor(
    private userSrv: UserService,
    private router: Router
  ){}

  ngOnInit() {
  }
fn_signup() {
    swal({
      title: 'Confirm Create?',
      text: 'Once confirmed, You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16be9a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirmed it!'
    }).then((result) => {
      if (result.value) {
        if(this.model.password==this.model.cpassword){
          this.userSrv.create(this.model).subscribe(
            data =>{
              if(data.status == 200){
                //console.log('stat 200 ',JSON.parse(data._body));
                let obj = JSON.parse(data._body);
                swal({
                  title: obj.username + ' Confirmed',
                  text: 'Entry Created! Email: '+obj.email,
                  timer: 3500,
                  type:'success',
                  onOpen: () => {
                    swal.showLoading();
                  }
                }).then((result) => {
                  if (result.dismiss.toString() === 'timer') {
                    this.model = [];
                    this.router.navigate(['/login']);
                    //console.log('Closed by the timer and .navigate([/login]);');
                  }
                });
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
        }else{
          swal(
            'Please check!',
            'Password did not match.',
            'warning'
          );
        }
      }
    });
  }
}
