import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServermaintenanceComponent } from './servermaintenance/servermaintenance.component';

const routes: Routes = [
    { path: '', loadChildren: './defroute/defroute.module#DefrouteModule' },
    { path:'login',component: LoginComponent},
    { path:'signup',component: SignupComponent},
    { path:'error',component: ServermaintenanceComponent},
    { path:'not-found',component: PagenotfoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
