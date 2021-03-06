import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { LogComponent } from './log/log.component';
import { DeviceComponent } from './device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [
    { path: '', component: MenuComponent,
    children:[
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path:'log',component: LogComponent},
        { path:'device',component: DeviceComponent},
        { path:'dashboard',component: DashboardComponent},
        { path:'voucher',component: VoucherComponent}
    ]},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule { }
