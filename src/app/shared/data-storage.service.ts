import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http : HttpClient , private rs : RecipeService , private as : AuthService) {
}


storeRecipes(){
      const recipes= this.rs.getRecipes();
      this.http.put
      ('https://ng-course-recipe-381e3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          recipes)
          .subscribe( response =>{
              console.log(response)
          });
}
// fetchRecipes(){
//         return this.as.user.pipe(
//             take(1),
//             exhaustMap(user =>{
//             //take(1) : just subcreibe 1 vlaue ,then automaticlly unsubscribe
//             return this.http.get<Recipe[]>(
//                     'https://ng-course-recipe-381e3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
//                     {
//                         params : new HttpParams().set('auth', user.token)
//                     }
//                     )
//         }
//         ),
//
//                 map(recipes =>{
//                 return recipes.map(recipe => {
//                     return {
//                         ...recipe,
//                         ingredients : recipe.ingredients  ? recipe.ingredients : []
//                     };
//                 });
//             }),
//                 tap(recipes =>{
//                     this.rs.setRecipes(recipes);
//                 })
//         );
//
//
// }
// }


    fetchRecipes() {
        return this.as.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<Recipe[]>(
                    'https://ng-course-recipe-381e3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.rs.setRecipes(recipes);

            })
        );
    }
}



