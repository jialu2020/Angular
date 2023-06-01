import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();

    recipes: Recipe[]= [
        new Recipe('British shakshuka',
        'This British shakshuka is fun! It’s the full English – sausages, bacon, mushrooms, tomatoes, beans and eggs – all cooked in one pan. And if you like a bit of brown sauce with your brekkie, it’s used to glaze the sausages and give a subtle tang to the tomato sauce.', 
        'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/british_shakshuka_26737_16x9.jpg'),
      
        new Recipe('Pumpkin and bacon pasta with garlic crumbs',
        'This is another simply description', 
        'https://img.taste.com.au/0b9HW71J/w720-h480-cfill-q80/taste/2016/11/pumpkin-and-bacon-pasta-with-garlic-crumbs-106172-1.jpeg'),
         
        new Recipe('Hot pot','The ultimate Chinese hot pot guide that explains the different types of broth, dipping sauces, ingredients and equipment, plus all you need to know to host a successful hot pot party. ','https://omnivorescookbook.com/wp-content/uploads/2018/12/230102_Hot-Pot-Guide_550.jpg')
      
      ];
        
    getRecipes(){
        return this.recipes.slice();
    }

    

}