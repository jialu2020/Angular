import { Component , OnInit} from '@angular/core';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
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
