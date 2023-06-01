import { Component, Input, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
 
})

export class ShoppingListComponent implements OnInit {
  
   ingredients: Ingredients[];

   


  constructor(private shoppinglistService : ShoppingListService){
  }

  ngOnInit(){
     this.ingredients = this.shoppinglistService.getIngredients();

     console.log("id like to check here")
  }

  
  onIngredientAdded(ingredient :Ingredients){

    this.ingredients.push(ingredient);

      console.log("push dao " )
  }

}
