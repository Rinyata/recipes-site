import { Component, EventEmitter, Output } from '@angular/core';
import { MealService } from '../services/meal.service';


@Component({
  
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  template: `<ejs-dropdownlist id='ddlelement'></ejs-dropdownlist>`

})
export class LeftMenuComponent {
  
  meals: any[] | undefined;
  kategori: string = '';
  static kategori: string = '';


  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();


  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.getMeals();
    this.deneme("undefined");
  }

  getMeals() {
    this.mealService.getMeals("categories").subscribe(
      (data: any) => {
        this.meals = data.categories;
      },
      (error: any) => {
        console.error('Error fetching meals:', error);
      }
    );
  }

  deneme(a:string){
    this.kategori = a;
    // if(a != "undefined"){
    //   alert(a);
    // }
  }

  onCategorySelect(category: string) {
    this.categorySelected.emit(category);
  }

}
