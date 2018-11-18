import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';

import { MenuComponent } from './menu.component';
import { LogComponent } from './log/log.component';
import { DeviceComponent } from './device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../shared/layout.module';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    LayoutModule,
//    SharedModule,
  ],
  declarations: [
    MenuComponent,
    LogComponent,
    DeviceComponent,
    DashboardComponent
  ]
})
export class MenuModule { }
