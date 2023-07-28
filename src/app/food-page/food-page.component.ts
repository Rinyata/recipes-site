import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {

  meal: any;

  constructor(private activatedRoute:ActivatedRoute, private router: Router, private MealService:MealService) {
      activatedRoute.params.subscribe((params: any)  =>{ 
        const id = params['foodId']; // Parametre adını 'foodId' olarak değiştirin
        console.log(id);
        if (id) {
          console.log("girdik");
          MealService.getMealsByID(id).subscribe(
            (data: any) => {
              this.meal = data;
            },
            (error: any) => {
              console.error('Error fetching meal:', error);
            }
          );
        }
      })
  }

  counter(length: number) {
    return Array.from({ length }, (_, index) => index);
  }

}