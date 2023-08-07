import { Component, OnDestroy } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; //for bootstrap
import { MealService } from '../services/meal.service';
import { DataSharingService } from '../services/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-carts',
  templateUrl: './main-carts.component.html',
  styleUrls: ['./main-carts.component.css']
})
export class MainCartsComponent implements OnDestroy {

  idsByCategories: string[] = [];
  idsByAreas: string[] = [];
  mealByIds: any[] = [];
  SelectedCategory = "";
  SelectedArea = "";
  SelectedMeals: string[] = [];
  meals: any;

  private categorySubscription: Subscription = new Subscription();
  private areaSubscription: Subscription = new Subscription();
  private searchSubscruption: Subscription = new Subscription();

  constructor(
    private modalService: NgbModal,
    private mealService: MealService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
    this.categorySubscription = this.dataSharingService.categoryChanged$.subscribe((category: string) => {
      this.SelectedCategory = category;
      if (this.SelectedCategory) {
        this.getIds();
      }
    });

    this.areaSubscription = this.dataSharingService.areaChanged$.subscribe((area: string) => {
      this.SelectedArea = area;
      if (this.SelectedArea) {
        this.getIds();
      }
    });

    this.searchSubscruption = this.dataSharingService.searchChanged$.subscribe((search: string[]) => {
      this.SelectedMeals = search;
      if (this.SelectedMeals) {
        //this.getMealByIDs(this.dataSharingService.getSelectedMealsBySearchBar())
        //this.dataSharingService.getSelectedMealsBySearchBar();
        this.mealByIds= this.SelectedMeals;
      }
    });

    if(this.SelectedCategory == ''){
      this.mealService.getMealsBy("foodsByCategories", "Seafood").subscribe(
        (data: any) => {
          this.meals = data.meals;
          this.idsByCategories = this.meals.map((meal: { idMeal: string }) => meal.idMeal);
          this.getMealByIDs(this.idsByCategories);
        },
        (error: any) => {
          console.log("error", error);
        }
      );
    }

  }

  getIds() {
    // Kategoriler için:
    if (this.SelectedCategory !== "") {
      this.mealService.getMealsBy("foodsByCategories", this.SelectedCategory).subscribe(
        (data: any) => {
          this.meals = data.meals;
          this.idsByCategories = this.meals.map((meal: { idMeal: string }) => meal.idMeal);
          this.getMealByIDs(this.idsByCategories);
        },
        (error: any) => {
          console.log("error", error);
        }
      );
    } else {
      this.idsByCategories = [];
      this.getMealByIDs(this.idsByCategories);
    }

    // Alanlar için:
    if (this.SelectedArea !== "") {
      this.mealService.getMealsBy("foodByAreas", this.SelectedArea).subscribe(
        (data: any) => {
          this.meals = data.meals;
          this.idsByAreas = this.meals.map((meal: { idMeal: string }) => meal.idMeal);
          this.getMealByIDs(this.idsByAreas);
        },
        (error: any) => {
          console.log("error", error);
        }
      );
    } else {
      this.idsByAreas = [];
      this.getMealByIDs(this.idsByAreas);
    }
  }

  getMealByIDs(ids: any[]) {
    if(ids){
      this.mealByIds = [];
      for (let i = 0; i < ids.length; i++) {
        this.mealService.getMealsByID(ids[i]).subscribe(
          (data: any) => {
            //flundar was here
            this.mealByIds[i] = data.meals[0];
          },
          (error: any) => {
            console.log("error", error);
          }
        );
      }
    }
  }

  ngOnDestroy() {
    // Abonelikleri unsubscribe etmek için ngOnDestroy yöntemini kullandık.
    this.categorySubscription.unsubscribe();
    this.areaSubscription.unsubscribe();
  }

  getSentences(instruction: string): string {
    let final: string = '';
    if (instruction) {
      if (instruction.length <= 100 && instruction != null) {
        final = instruction;
      } else {
        for (let i = 0; i < 100; i++) {
          final += instruction[i];
        }
        final += '.';
      }
    }
    return final;
  }


}
