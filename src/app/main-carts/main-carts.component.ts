import { Component, NgModule } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; //for bootstrap
import { MealService } from '../services/meal.service';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { DataSharingService } from '../services/data-sharing.service';
import { Subscription, concatMap, forkJoin, of, take } from 'rxjs'; // Buradaki satırı ekleyin


@Component({
  selector: 'app-main-carts',
  templateUrl: './main-carts.component.html',
  styleUrls: ['./main-carts.component.css']
})
export class MainCartsComponent {
  mealsByCategories: any;
  mealsByIDs: any[] = [];
  selectedCategory: string = 'Seafood';
  ids: string[] = [];
  private categorySubscription: Subscription = new Subscription(); // Başlangıç değeri verme


  constructor(private modalService: NgbModal, private mealService: MealService, private dataSharingService: DataSharingService){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {
    this.categorySubscription = this.dataSharingService.categoryChanged$.subscribe((category: string) => {
      this.selectedCategory = category;
      if (this.selectedCategory) {
        this.getMealsBy();
      }
    });
    // İlk kez yemekleri getirmek için getMealsBy fonksiyonunu çağırın
    this.getMealsBy();
  }

  getMealsBy() {
    this.selectedCategory = this.dataSharingService.getSelectedCategory();

    if (!this.selectedCategory) {
      console.log('Kategori değeri yok veya boş.');
      this.selectedCategory = "SeaFood";
    }

    this.mealService.getMealsBy("foodsByCategories", this.selectedCategory).subscribe(
      (data: any) => {
        this.mealsByCategories = data.meals;

        this.mealsByCategories.forEach((meal: { idMeal: string; }) => {
          const id = meal.idMeal;
          this.mealService.getMealsByID(id).pipe(
            concatMap((mealData: any) => {
              return of(mealData);
            })
          ).subscribe(
            (mealData: any) => {
              this.mealsByIDs.push(mealData);
            },
            (error: any) => {
              console.error('Error fetching meals by ID:', error);
            }
          );
        });

        this.mealsByCategories.forEach((meal: { idMeal: string; }) => {
          this.ids.push(meal.idMeal);
        });
      },
      (error: any) => {
        console.error('Error fetching meals:', error);
      }
    );

  }

  getInstructionsByMealId(id: string): string {
    let meal;
    for (let i = 0; i < this.mealsByIDs.length; i++) {
      if(id == this.mealsByIDs[i]['meals'][0].idMeal){
        meal = this.mealsByIDs[i]['meals'][0].strTags
        //flundar was here
      }
    }
    return meal  ? meal : 'none';
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }


}
