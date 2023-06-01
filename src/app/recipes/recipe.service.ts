import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[]= [
        new Recipe('CHINESE HOT POT',
        'Chinese Hot Pot is an interactive meal in which diners sit around a simmering pot of soup at the center of the table with various raw ingredients—meat, seafood, vegetables, tofu, and starches—in thin slices or small pieces for quick cooking.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/12/83/d6/e3/olla-combinacion-4.jpg'),
      
        new Recipe('Pumpkin and bacon pasta with garlic crumbs',
        'This is another simply description', 
        'https://img.taste.com.au/0b9HW71J/w720-h480-cfill-q80/taste/2016/11/pumpkin-and-bacon-pasta-with-garlic-crumbs-106172-1.jpeg'),
        new Recipe('Steamed Pork Buns (Baozi)','Tasty, juicy filling with soft, fluffy wrappers, homemade bao buns are super comforting! This guide offers tips and tricks to ensure a fail-proof cooking experience. ','https://asianinspirations.com.au/wp-content/uploads/2019/06/R02325_Chinese_Steamed_Pork_Buns.jpg')
      ];
         
      
    getRecipes(){
        return this.recipes.slice();
          }

}