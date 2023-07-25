import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {

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

}