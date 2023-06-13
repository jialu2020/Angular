import { Component , OnInit} from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit{
  /*private selectedRecipe: Recipe;*/


  ngOnInit(){
   /* this.rS.selectedRecipe.subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
    )*/
  }

  constructor(){

  }

}
