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
  SelectedCategory = "Seafood";
  SelectedArea = "";
  meals: any;

  private categorySubscription: Subscription = new Subscription();
  private areaSubscription: Subscription = new Subscription();

  constructor(
    private modalService: NgbModal,
    private mealService: MealService,
    private dataSharingService: DataSharingService
  ) {}

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
    
  }

  getIds() {
    console.log("getIds çalıştı");

    // Kategoriler için:
    if (this.SelectedCategory !== "") {
      this.mealService.getMealsBy("foodsByCategories", this.SelectedCategory).subscribe(
        (data: any) => {
          this.meals = data.meals;
          this.idsByCategories = this.meals.map((meal: { idMeal: string }) => meal.idMeal);
          console.log("kategoriden id çektik koyduk.");
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
          console.log("areadan id çektik koyduk.");
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
    console.log("getMealByIds: ");
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

  ngOnDestroy() {
    // Abonelikleri unsubscribe etmek için ngOnDestroy yöntemini kullanın
    this.categorySubscription.unsubscribe();
    this.areaSubscription.unsubscribe();
  }
}
