import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServermaintenanceComponent } from './servermaintenance/servermaintenance.component';
import { AuthGuard } from './shared/shared.module';

const routes: Routes = [
    { path: '',
      redirectTo: 'default',
      pathMatch: 'full'
    },
    { path: 'default',
      loadChildren: './defroute/defroute.module#DefrouteModule',
    },
    { path: 'portal',
      loadChildren: './menu/menu.module#MenuModule',
      canActivate: [AuthGuard]
    },
    { path:'login',component: LoginComponent},
    { path:'signup',component: SignupComponent},
    { path:'error',component: ServermaintenanceComponent},
    { path:'not-found',component: PagenotfoundComponent},
    { path: '**',redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
