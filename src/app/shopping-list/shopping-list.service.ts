import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientsChange = new EventEmitter<Ingredients[]>();




    private ingredientsLi : Ingredients[] = [ 

        new Ingredients("Apple", 5),
        new Ingredients("Tomaten", 12),
    
       ];

    getIngredients(){
       return this.ingredientsLi.slice();

    }

    addIngredients(ingredientAdd : Ingredients){
      this.ingredientsLi.push(ingredientAdd); 
      this.ingredientsChange.emit(this.ingredientsLi.slice());

    }

}