import { Component, NgModule } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; //for bootstrap
import { MealService } from '../services/meal.service';
import { LeftMenuComponent } from '../left-menu/left-menu.component';


@Component({
  selector: 'app-main-carts',
  templateUrl: './main-carts.component.html',
  styleUrls: ['./main-carts.component.css']
})
export class MainCartsComponent {
  meals: any;
  kategori: string = '';
  selectedCategory: string = '';

  constructor(private modalService: NgbModal, private mealService: MealService){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {
    this.getMealsBy();
    this.onCategorySelected(this.selectedCategory);
  }

  // getKategori(){
  //   this.kategori = LeftMenuComponent.kategori;
  //   alert(this.getKategori());
  //   return LeftMenuComponent.kategori;
  // }

  getMealsBy() {
    // alert(this.getKategori());
    this.mealService.getMealsBy("foodsByCategories", this.selectedCategory).subscribe(
      (data: any) => {
        this.meals = data.meals;
        alert(this.meals);
      },
      (error: any) => {
        console.error('Error fetching meals:', error);
      }
    );
  }

  onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.kategori = category; // Seçilen kategoriyi kategori değişkenine atayın
    this.getMealsBy(); // Yemekleri getirmek için getMealsBy fonksiyonunu tekrar çağırın
  }

}
