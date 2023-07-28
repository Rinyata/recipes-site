import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  static getMealsByID(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getMeals(param:string) {
    if(param =="All")
      return this.http.get<any[]>(this.apiUrl + 'search.php?f=a');
    else if(param == "categories")
      return this.http.get<any[]>(this.apiUrl + 'categories.php');
    else return this.http.get<any[]>(this.apiUrl + 'search.php?f=a');
  }

  getMealsBy(param:string, index:string) {
    if(param == "foodsByCategories")
      return this.http.get<any[]>(this.apiUrl + 'filter.php?c=' + index);
    else return this.http.get<any[]>(this.apiUrl + 'search.php?f=a');
  }

  getMealsByID(id:string) {
    //console.log("getmealsbyidgirdik");
    //console.log( this.http.get<any[]>(this.apiUrl + 'lookup.php?i=' + id));
    return this.http.get<any[]>(this.apiUrl + 'lookup.php?i=' + id);
  }

}