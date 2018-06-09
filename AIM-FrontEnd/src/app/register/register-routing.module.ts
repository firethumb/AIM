import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CustomerRegistration } from './customerregistration.component';
import { VendorRegistration } from './vendorregistration.component';

const routes: Routes = [
  {
    path: 'vendorregistration',
    component: VendorRegistration
  },
  {
    path: 'customerregistration',
    component: CustomerRegistration,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
