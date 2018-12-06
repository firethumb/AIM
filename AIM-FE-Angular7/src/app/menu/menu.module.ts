import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { LogComponent } from './log/log.component';
import { DeviceComponent } from './device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../shared/layout.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    LayoutModule,
    SharedModule,
    FileUploadModule
  ],
  declarations: [
    MenuComponent,
    LogComponent,
    DeviceComponent,
    DashboardComponent,
    FileUploadComponent
  ]
})
export class MenuModule { }
