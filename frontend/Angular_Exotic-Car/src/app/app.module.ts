import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrandMenuComponent } from './components/brand-menu/brand-menu.component';
import { Routes, RouterModule, Router}  from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarModelListComponent } from './components/car-model-list/car-model-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { CarModelDetailsComponent } from './components/car-model-details/car-model-details.component';

const routes: Routes = [
  {path: 'carModels/:id', component: CarModelDetailsComponent},
  {path: 'search/:keyword', component: CarModelListComponent},
  {path: 'brand/:id/:brandName', component: CarModelListComponent},
  {path: 'brands', component: CarModelListComponent},
  {path: 'carModels', component: CarModelListComponent},
  {path: '', redirectTo:'/carModels', pathMatch: 'full' },
  {path: '**', redirectTo: '/carModels', pathMatch: 'full'}
] 

@NgModule({
  declarations: [
    AppComponent,
    BrandMenuComponent,
    CarModelListComponent,
    SearchComponent,
    CarModelDetailsComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
