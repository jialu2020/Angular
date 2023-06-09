import {Component, OnInit} from '@angular/core';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Params} from "@angular/router";
import {Recipe} from "../recipe.model";
import {ngbCarouselTransitionOut} from "@ng-bootstrap/ng-bootstrap/carousel/carousel-transition";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit{
    recipe : Recipe;
    id: number;



  constructor(private rService : RecipeService,
              private route : ActivatedRoute){
  }


  addToShoppingList(){

     console.log ("i clicked the add SL button!! :  " + this.recipe.ingredients)
     this.rService.addIngredientsToShoppingList(this.recipe.ingredients);



    //  for(let i =0 ; i < this.recipe.ingredients.length; i++){

    //       this.sLService.addIngredients( this.recipe.ingredients[i]);

     }

    ngOnInit(){
      this.route.params.subscribe(
          (par : Params) => {
              this.id = +par['id'];
              this.recipe = this.rService.getRecipesById(this.id)
          }
      )
        console.log('this id is ' + this.id)
    }


  }


