import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';

import { VendorComponent } from './vendor.component';
import { VendorRoutingModule } from './vendor-routing.module';

@NgModule({
  imports: [
    VendorRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ VendorComponent ]
})
export class VendorModule { }
