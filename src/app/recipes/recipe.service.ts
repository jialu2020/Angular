import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";


@Injectable()
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();


    recipes: Recipe[]= [
        new Recipe('British shakshuka',
        'This British shakshuka is fun! It’s the full English – sausages, bacon, mushrooms, tomatoes, beans and eggs – all cooked in one pan. And if you like a bit of brown sauce with your brekkie, it’s used to glaze the sausages and give a subtle tang to the tomato sauce.', 
        'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/british_shakshuka_26737_16x9.jpg' ,
        [ new Ingredients("tomate", 3),
         new Ingredients("sausage", 6),
         new Ingredients("onion", 1),
         new Ingredients("mushroom", 200)]),
        
         
        new Recipe('Pumpkin and bacon pasta with garlic crumbs',
        'This is another simply description', 
        'https://img.taste.com.au/0b9HW71J/w720-h480-cfill-q80/taste/2016/11/pumpkin-and-bacon-pasta-with-garlic-crumbs-106172-1.jpeg',
        [new Ingredients("garlic", 1),
        new Ingredients("pupkin", 1),
        new Ingredients("bacon", 3),]),
         
        new Recipe('Hot pot',
        'The ultimate Chinese hot pot guide that explains the different types of broth, dipping sauces, ingredients and equipment, plus all you need to know to host a successful hot pot party. ',
        'https://omnivorescookbook.com/wp-content/uploads/2018/12/230102_Hot-Pot-Guide_550.jpg',
        [new Ingredients("sichuan pfeffer" , 10 ),
        new Ingredients("soup base" , 1 ),
        new Ingredients("Beef," , 5 ),
        new Ingredients("lamb" , 5 ),
        new Ingredients("Shrimp" , 5 ), ])
      
      ];
        
    
    constructor(private sLService : ShoppingListService){}


    getRecipes(){
        return this.recipes.slice();
    }
    getRecipesById(id : number){
        return this.recipes.slice()[id];
    }

    addIngredientsToShoppingList(ingredients :Ingredients[]){
       this.sLService.addIngredientsList(ingredients);
        }



    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChange.next(this.recipes.slice())
        console.log('recipes are : ')
        console.log(this.recipes)

    }


    updateRecipe(index:number ,newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChange.next(this.recipes.slice())


    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChange.next(this.recipes.slice())

    }
    }



