import { Ingredients } from "../shared/ingredient.model";

export class ShoppingListService {


    private ingredientsLi : Ingredients[] = [ 

        new Ingredients("Apple", 5),
        new Ingredients("Tomaten", 12),
    
       ];

    getIngredients(){
       return this.ingredientsLi.slice();

    }

}