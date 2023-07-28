import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //allows us to make http requests
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //for bootstrap
import { AppRoutingModule } from './app-routing.module'; // AppRoutingModule import edin


import { AppComponent } from './app.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { HeaderComponent } from './header/header.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MainCartsComponent } from './main-carts/main-carts.component';
import { MatSelectModule } from '@angular/material/select'; // Mat-Select bileşenini ekleyin
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartsComponent } from './carts/carts.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MealListComponent,
    HeaderComponent,
    LeftMenuComponent,
    MainCartsComponent,
    CartsComponent,
    FoodPageComponent,
    MainPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSelectModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent,MainPageComponent]
})
export class AppModule { }
