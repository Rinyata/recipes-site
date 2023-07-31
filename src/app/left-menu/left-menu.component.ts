import { Component, EventEmitter, Output } from '@angular/core';
import { MealService } from '../services/meal.service';
import { DataSharingService } from '../services/data-sharing.service';
import { ActivatedRoute,Router } from '@angular/router'; //activatedrouter reading from the router and router is for writing to the route


@Component({
  
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  template: `<ejs-dropdownlist id='ddlelement'></ejs-dropdownlist>`

})
export class LeftMenuComponent {
  
  meals: any[] | undefined;
  areas: any[] | undefined;

  constructor(private mealService: MealService, private dataSharingService: DataSharingService, private route:ActivatedRoute, private router:Router) { }
  //constructor parantezine kullanacağımız servisleri ekliyoruz ve buna enjekte etmek deniyor. 
  //Servisi kullanabilmesini sağlamak için gerekli.

  ngOnInit() {
    this.getMeals();
    this.getAreas();
  }

  getMeals() {
    this.mealService.getMeals("categories").subscribe(
      (data: any) => {
        this.meals = data.categories;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching meals:', error);
      }
    );
  }
  getAreas() {
    this.mealService.getMeals("area").subscribe(
      (data: any) => {
        this.areas = data.meals;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching meals:', error);
      }
    );
  }

  onCategorySelect(category: string){
    console.log('Seçilen kategori: ', category); // Kategori seçimi kontrolü için bu satırı ekleyin
    this.dataSharingService.setSelectedCategory(category);
  }

  onAreaSelect(area: string){
    console.log('Seçilen alan: ', area);// Alanı seçimi kontrol
    this.dataSharingService.setSelectedArea(area);
  }

}