import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {
  @Input() recipe:Recipe;

  constructor(private rService : RecipeService){

  }


  addToShoppingList(){

     console.log ("i clicked the add SL button!! :  " + this.recipe.ingredients)
     this.rService.addIngredientsToShoppingList(this.recipe.ingredients);



    //  for(let i =0 ; i < this.recipe.ingredients.length; i++){

    //       this.sLService.addIngredients( this.recipe.ingredients[i]);

     }
 
     
 
     
     
 


  }


