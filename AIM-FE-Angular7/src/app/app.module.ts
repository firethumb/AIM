import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
//import { HeaderComponent } from './defroute/header/header.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServermaintenanceComponent } from './servermaintenance/servermaintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  //  HeaderComponent,
    SignupComponent,
    PagenotfoundComponent,
    ServermaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
