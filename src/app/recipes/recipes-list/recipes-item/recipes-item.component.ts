import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipe.model";
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit{
 @Input() recipe: Recipe;
//  @Output() selectedRecipe = new EventEmitter<void>();
 constructor(private recipeService : RecipeService){
 }

  ngOnInit(){



  }

  onSelectRecipe(){
  //  this.selectedRecipe.emit();
  this.recipeService.recipeSelected.emit(this.recipe);
    console.log("i choice you : " + this.recipe.name)
  }
}
