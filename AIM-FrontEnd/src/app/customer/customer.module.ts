import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';

import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CustomerRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ CustomerComponent ]
})
export class CustomerModule { }
