import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MainCartsComponent } from '../main-carts/main-carts.component';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private selectedCategory: string = '';
  private selectedArea: string = '';
  meals: string[] = [];
  private categoryChangedSource = new Subject<string>();
  private areaChangedSource = new Subject<string>();
  private searchChangedSource = new Subject<string[]>(); //array yaptık

  areaChanged$ = this.areaChangedSource.asObservable();
  categoryChanged$ = this.categoryChangedSource.asObservable();
  searchChanged$ = this.searchChangedSource.asObservable();
  //categoryChanged$ burada biz gözlemci objedir.

  setSelectedCategory(category:string){
    this.selectedCategory= category;
    this.categoryChangedSource.next(category); // Kategori değiştiğinde dinleyicilere haber vermek için
  }

  setSelectedArea(area:string){
    this.selectedArea= area;
    this.areaChangedSource.next(area); // Area değiştiğinde dinleyicilere haber vermek için
  }

  getSelectedCategory(){
    return this.selectedCategory;
  }

  getSelectedArea(){
    return this.selectedArea;
  }

  setSelectedMealsBySearchBar(meals:string[]){
    this.meals= meals;
    this.searchChangedSource.next(meals); // Area değiştiğinde dinleyicilere haber vermek için
  }


}
