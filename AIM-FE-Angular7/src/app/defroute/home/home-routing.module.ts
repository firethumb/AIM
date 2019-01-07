import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ArticleComponent } from './article/article.component';
import { DocuComponent } from './docu/docu.component';
import { PromoComponent } from './promo/promo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'documents', component: DocuComponent },
  { path: 'promo', component: PromoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
