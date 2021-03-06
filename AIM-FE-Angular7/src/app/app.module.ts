import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
//import { HeaderComponent } from './defroute/header/header.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServermaintenanceComponent } from './servermaintenance/servermaintenance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/shared.module';

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
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
