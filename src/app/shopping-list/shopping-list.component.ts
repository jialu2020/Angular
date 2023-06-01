import { Component, Input, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
 
})

export class ShoppingListComponent implements OnInit {
  
   íngredients : Ingredients[];
ingredients: any;
   


  constructor(private shoppinglistService : ShoppingListService){
  }

  ngOnInit(){
     this.íngredients = this.shoppinglistService.getIngredients();

     console.log("id like to check here")
  }

  
  onIngredientAdded(ingredient :Ingredients){

    this.íngredients.push(ingredient);

      console.log("push dao " )
  }

}
