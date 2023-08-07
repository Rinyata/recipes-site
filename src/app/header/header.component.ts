import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; //activatedrouter reading from the router and router is for writing to the route
import { MealService } from '../services/meal.service';
import { MainCartsComponent } from '../main-carts/main-carts.component';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchTerm: string = "";
  mealsByFirstLetter: any;
  activeMeals: any;
  mealByIds: string[] = [];

  
  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private router: Router,
    private DataSharingService: DataSharingService
    ) {}
    
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  } 
  
  getMealByIDs(ids: string[]) {
    
    if(ids){
      this.mealByIds = [];
      for (let i = 0; i < ids.length; i++) {
        setTimeout(() => { //asenkron çalışması için 2 saniye bekletiyoruz, html servis çalışmadan istiyodu bunu çözdük
          this.mealService.getMealsByID(ids[i]).subscribe(
                
            (data: any) => {
              //flundar was here
      
              console.log(data);
      
              this.mealByIds[i] = data.meals[0];
              
            },
            (error: any) => {
              console.log("error", error);
            }
          );
        },2000)     
      }
      this.DataSharingService.setSelectedMealsBySearchBar(this.mealByIds);
    }
  }

  
  searchOnChange(): void {
    if (this.searchTerm) {
      const ilkHarf = this.searchTerm.charAt(0); // İlk harfi alıyoruz
      this.findMealsByFirstLetter(ilkHarf); // İlk harfi kullanacağınız fonksiyona gönderelim
      // this.filterMealsBySearchTerm(); // Search term'e göre yemekleri filtreleyelim
    }
  }
  
  findMealsByFirstLetter(ilkHarf: string): void {
    this.mealService.getMealsBy("firstletter", ilkHarf).subscribe(
      (veri: any) => {
        this.mealsByFirstLetter = veri.meals;
        this.activeMeals = this.mealsByFirstLetter; // Başlangıçta harfle aldığımız tüm yemekleri aktif yemekler olarak atıyoruz
        this.filterMealsBySearchTerm(); // Search term'e göre yemekleri filtreleyelim
      },
      (hata: any) => {
        console.log("Hata", hata);
      }
    );
  }
  
  filterMealsBySearchTerm(): void {
    if(this.mealsByFirstLetter != null){
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase(); // Karşılaştırma işlemi için search term'i küçük harfe çeviriyoruz
        for(let i = 0 ; i<this.mealsByFirstLetter.length ; i++){
          this.activeMeals = this.mealsByFirstLetter.filter((meal: any) =>
            meal.strMeal.toLowerCase().includes(searchTermLower)
          ).map((meal: any) => meal.idMeal); // Sadece idMeal bilgisini içeren bir dizi oluşturuyoruz
        }
        this.getMealByIDs(this.activeMeals);
      } else {
        this.activeMeals = this.mealsByFirstLetter.map((meal: any) => meal.idMeal); // Eğer search term boşsa, tüm yemeklerin idMeal bilgilerini içeren bir dizi oluşturuyoruz
      }
    }
   
  }
  
  
}
