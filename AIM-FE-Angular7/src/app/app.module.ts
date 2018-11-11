import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
//import { HeaderComponent } from './defroute/header/header.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServermaintenanceComponent } from './servermaintenance/servermaintenance.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { LogComponent } from './menu/log/log.component';
import { DeviceComponent } from './menu/device/device.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  //  HeaderComponent,
    SignupComponent,
    PagenotfoundComponent,
    ServermaintenanceComponent,
    MenuComponent,
    DashboardComponent,
    LogComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
