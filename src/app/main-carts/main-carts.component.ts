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

  idsByCategories: string[] = [];
  idsByAreas: string[] = [];

  mealByIds: any[] = [];

  SelectedCategory = "Seafood";
  SelectedArea ="";

  meals:any;

  private categorySubscription: Subscription = new Subscription(); // Başlangıç değeri verelim
  private areaSubscription: Subscription = new Subscription();

  constructor(private modalService: NgbModal, private mealService: MealService, private dataSharingService: DataSharingService){}

  ngOnInit(){
    this.categorySubscription = this.dataSharingService.categoryChanged$.subscribe((category : string) => {
      this.SelectedCategory = category;
      if (this.SelectedCategory){
        this.getIds();
      }
    });

    this.areaSubscription = this.dataSharingService.areaChanged$.subscribe((area : string) => {
      this.SelectedArea = area;
      if(this.SelectedArea){
        this.getIds();
      }
    })
  }

  getIds(){
    //kategorileriçin:
    this.mealService.getMealsBy("foodsByCategories", this.SelectedCategory).subscribe(
      
      (data:any) => {
        console.log(data);
        this.meals=data.meals;
        if(this.SelectedCategory!=null){
        this.meals.forEach((meal: {idMeal: string}) => {
          this.idsByCategories.push(meal.idMeal);
          console.log("kategoriden id çektik koyduk.");
        })
        this.getMealByIDs(this.idsByCategories);
      }
      }
    )
    //areaiçin:
    this.mealService.getMealsBy("foodByAreas", this.SelectedArea).subscribe(
      (data:any) => {
        let meals;
        this.meals=data.meals;
        if(this.SelectedArea!=null){
          this.meals.forEach((meal: {idMeal: string}) => {
            console.log("areadan id çektik koyduk.");
            this.idsByAreas.push(meal.idMeal);
          })
          this.getMealByIDs(this.idsByAreas);
        }
      }
    )
  }
  
  getMealByIDs(ids: any[]){
    console.log("getMealByIds: ");
    for (let i=0 ; i<ids.length ; i++){

      this.mealService.getMealsByID(ids[i]).subscribe(
        (data:any) => {
          console.log("data.meals sırayla:")
          console.log(data.meals[0]);
          //flundar was here
          this.mealByIds[i] = data.meals[0];
        },
        (error : any) =>{
          console.log("error",error);
        }
      )

      // this.mealByIds[i]["meals"][0].id    
    }
  }

}
