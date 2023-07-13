import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})


export class RecipesListComponent implements OnInit, OnDestroy{

  recipes: Recipe[] = [];
  subscription : Subscription;



  constructor(private rService : RecipeService){}

  ngOnInit() {

    this.subscription =  this.rService.recipesChange.subscribe(
        (recipes: Recipe[])=> {
          this.recipes = recipes;
        }
    );

    this.recipes = this.rService.getRecipes();
    console.log('currently recipelist are : ')
    console.log(this.recipes)


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
