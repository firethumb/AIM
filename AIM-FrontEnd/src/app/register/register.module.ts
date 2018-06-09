import { NgModule } from '@angular/core';

import { CustomerRegistration } from './customerregistration.component';
import { VendorRegistration } from './vendorregistration.component';

import { RegisterRoutingModule } from './register-routing.module';


@NgModule({
  imports: [
    RegisterRoutingModule

  ],
  declarations: [
    CustomerRegistration,
    VendorRegistration
  ]
})
export class RegisterModule { }
