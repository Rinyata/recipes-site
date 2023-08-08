import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodPageComponent } from './food-page/food-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignPageComponent } from './sign-page/sign-page.component';
import { MyPageComponent } from './my-page/my-page.component';

const routes: Routes = [
  
  { path: '', component: MainPageComponent },
  { path: 'app-main-page', component: MainPageComponent },
  { path: 'food/:foodId', component: FoodPageComponent },
  { path: 'app-left-menu', component: MainPageComponent},
  { path: 'sign-page', component: SignPageComponent },
  { path: 'user', component: MyPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

