import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodPageComponent } from './food-page/food-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  
  { path: '', component: MainPageComponent },
  { path: 'app-main-page', component: MainPageComponent },
  { path: 'food/:foodId', component: FoodPageComponent },
  { path: 'app-left-menu', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

