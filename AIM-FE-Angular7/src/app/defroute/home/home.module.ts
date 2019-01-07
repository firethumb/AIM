import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ArticleComponent } from './article/article.component';
import { DocuComponent } from './docu/docu.component';
import { PromoComponent } from './promo/promo.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, ArticleComponent, DocuComponent, PromoComponent]
})
export class HomeModule { }
