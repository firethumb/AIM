import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';

import { MenuComponent } from './menu.component';
import { LogComponent } from './log/log.component';
import { DeviceComponent } from './device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  declarations: [
    MenuComponent,
    LogComponent,
    DeviceComponent,
    DashboardComponent
  ]
})
export class MenuModule { }
