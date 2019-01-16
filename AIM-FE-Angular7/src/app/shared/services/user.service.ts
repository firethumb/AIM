import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
//import { appConfig } from '../app.config';
import { UserInfo } from '../models/userinfo';

@Injectable()
export class UserService {
    constructor(private http: Http) {
      console.log('Data service connected...');
    }
    private BE_URL:string = "http://localhost:3000/api"
    private headers_var = new Headers({
      'Content-Type' : 'application/json',
      Authorization: localStorage.getItem("beJWT")
    });
    res:any = [];
    public create(user: UserInfo):  Observable<any> {
        return this.http.post(this.BE_URL +"/Users", user);
    }
    public logout():  Observable<any>{
        return this.http.post(this.BE_URL+"/Users/logout?access_token="+localStorage.getItem("beJWT"),{});
    }
    public login(userobj:any):  Observable<any>{
        return this.http.post(this.BE_URL+"/Users/login", userobj);
    }
    public getUsersbyID():Observable<any>{
      let urltmp:string = this.BE_URL+"/api/Users/" + localStorage.getItem("UID") //+ "?access_token=" + localStorage.getItem("beJWT");
      return this.http.get(urltmp,{headers:this.headers_var});
    }
}
