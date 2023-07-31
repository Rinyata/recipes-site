import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private selectedCategory: string = '';
  private selectedArea: string = '';
  private categoryChangedSource = new Subject<string>();
  private areaChangedSource = new Subject<string>();

  areaChanged$ = this.areaChangedSource.asObservable();
  categoryChanged$ = this.categoryChangedSource.asObservable();
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

}
