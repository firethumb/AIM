import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefrouteRoutingModule } from './defroute-routing.module';

import { DefrouteComponent } from './defroute.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { LicenseComponent } from './license/license.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PdetailsComponent } from './pdetails/pdetails.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DefrouteRoutingModule,
    SharedModule
  ],
  declarations: [
    DefrouteComponent,
    HeaderComponent,
    LicenseComponent,
    AboutusComponent,
    ProductComponent,
    PdetailsComponent
  ]
})
export class DefrouteModule { }
