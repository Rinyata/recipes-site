import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  meals: any[] | undefined;

  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.getMeals();
  }

  getMeals() {
    this.mealService.getMeals("All").subscribe(
      (data: any) => {
        this.meals = data.meals;
      },
      (error: any) => {
        console.error('Error fetching meals:', error);
      }
    );
  }
}
