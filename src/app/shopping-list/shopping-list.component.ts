import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
 
})

export class ShoppingListComponent implements OnInit , OnDestroy {
   ingredients: Ingredients[];
   private igChangeSub : Subscription;


   


  constructor(private shoppinglistService : ShoppingListService){
  }

  ngOnInit(){
     this.ingredients = this.shoppinglistService.getIngredients();

     this.igChangeSub = this.shoppinglistService.ingredientsChange.subscribe(
          (ingredients: Ingredients[]) => {
            this.ingredients = ingredients;

          }
     );

     console.log("id like to check here" + this.ingredients.length)
  }

    ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
    }



}

