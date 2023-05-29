import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

   ingredients : Ingredients[] = [ 

    new Ingredients("Apple", 5),
    new Ingredients("Tomaten", 12),

   ];


  constructor(){}
  ngOnInit(){}

  
  onIngredientAdded(ingredient :Ingredients){

    this.ingredients.push(ingredient);

    console.log("push dao " )
  }

}