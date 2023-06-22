import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {

    ingredientsChange = new Subject<Ingredients[]>();



    startedEditing = new Subject<number>();
    private ingredientsLi : Ingredients[] = [ 

        new Ingredients("Apple", 5),
        new Ingredients("Tomaten", 12),
    
       ];

    getIngredients(){
       return this.ingredientsLi.slice();

    }

    getIngredient(index : number){
        return this.ingredientsLi[index];
    }

    deleteIngredient(index:number){
        this.ingredientsLi.splice(index,1)
        this.ingredientsChange.next(this.ingredientsLi.slice());
    }

    addIngredients(ingredientAdd : Ingredients){
      this.ingredientsLi.push(ingredientAdd); 
      this.ingredientsChange.next(this.ingredientsLi.slice());

    }
    upgradeIngredient(index: number , newingredient : Ingredients){
     this.ingredientsLi[index] = newingredient;
     this.ingredientsChange.next(this.ingredientsLi.slice());

    }


    addIngredientsList(ingredients: Ingredients[]){
    //  for(let i of ingredients){
    //   this.addIngredients(i);
    //  }
    this.ingredientsLi.push(...ingredients);
    this.ingredientsChange.next(this.ingredientsLi.slice())


    }

}
