import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { SearchComponent } from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// @ts-ignore
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { ProjectComponent } from './components/project/project.component';
import { DetailComponent } from './components/detail/detail.component';
import { CompareComponent } from './components/compare/compare.component';
import { ContentComponent } from './components/content/content.component';
// import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignOutComponent,
    SearchComponent,
    HeaderComponent,
    ProjectComponent,
    DetailComponent,
    CompareComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // BrowserAnimationsModule,
    // MatAutocompleteModule,
    // NgZorroAntdModule,
    // DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
