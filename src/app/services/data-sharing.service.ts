import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private selectedCategory: string = '';
  private categoryChangedSource = new Subject<string>();

  categoryChanged$ = this.categoryChangedSource.asObservable();
  //categoryChanged$ burada biz gözlemci objedir.

  setSelectedCategory(category:string){
    this.selectedCategory= category;
    this.categoryChangedSource.next(category); // Kategori değiştiğinde dinleyicilere haber vermek için
  }

  getSelectedCategory(){
    return this.selectedCategory;
  }

}
