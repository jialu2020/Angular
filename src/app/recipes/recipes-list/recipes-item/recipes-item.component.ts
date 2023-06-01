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


  ngOnInit(){
  }

  constructor(private rService : RecipeService){

  }

  onSelectRecipe(){
    this.rService.selectedRecipe.emit(this.recipe); 
    // the recipe that we selected in the list


   
    console.log(" i click right now the recipe : " + this.recipe.name)

  }
}
