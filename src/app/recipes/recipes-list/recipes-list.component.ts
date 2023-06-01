import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})


export class RecipesListComponent implements OnInit {

  recipes: Recipe[];
 

  constructor(private rService : RecipeService){}

  ngOnInit() {

    this.recipes = this.rService.getRecipes();
  }

  onRecipeSelected(recipe:Recipe){
    this.rService.selectedRecipe.emit(recipe); 
    // the recipe that we selected in the list


   
    console.log("ssss" + recipe.name)

  }

}
