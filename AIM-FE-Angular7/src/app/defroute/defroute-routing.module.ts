import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefrouteComponent } from './defroute.component';
import { ProductComponent } from './product/product.component';
import { LicenseComponent } from './license/license.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PdetailsComponent } from './pdetails/pdetails.component';

const routes: Routes = [
    { path: '', component: DefrouteComponent,
    children:[
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', loadChildren: './home/home.module#HomeModule' },
        { path:'product/:id',component: PdetailsComponent},
        { path:'product',component: ProductComponent},
        { path:'license',component: LicenseComponent},
        { path:'about-us',component: AboutusComponent},
        { path: '**', redirectTo: 'home'}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DefrouteRoutingModule { }
