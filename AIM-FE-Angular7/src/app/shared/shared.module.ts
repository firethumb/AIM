import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from './components/card/card.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SwitchComponent } from './components/switch/switch.component';
import { AlertComponent } from './components/alert/alert.component';
import { Prodcard1Component } from './components/prodcard1/prodcard1.component';

import { JsonpModule } from '@angular/http';

/* components
import { CardComponent } from './components/card/card.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { TabContentComponent } from './components/tabset/tab-content/tab-content.component';

import { FileTreeComponent } from './components/file-tree/file-tree.component';

import { PellEditorComponent } from './components/pell-editor/pell-editor.component';

import { WeatherComponent } from './components/weather/weather.component';
import { ProfileCosmponent } from './components/profile/profile.component';
*/
@NgModule({
  imports: [
    CommonModule,
//    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
  ],
  declarations: [
    CardComponent,
//    FileUploadComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    Prodcard1Component
    /*
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    PellEditorComponent,

    WeatherComponent,
    ProfileComponent
    */
  ],
  exports: [
    CardComponent,
//    FileUploadComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    Prodcard1Component
    /*
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    PellEditorComponent,
    AlertComponent,
    WeatherComponent,
    ProfileComponent
    */
  ]
})
export class SharedModule { }
export * from './auth-guard/auth.guard';
