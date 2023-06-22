import {Component, OnInit, resolveForwardRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id : number;
  editMode = false;
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute , private recipeS: RecipeService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(
        (para : Params) => {
          this.id = +para['id'];
          this.editMode = para['id']!=null;
         /* to check if there is an id in the params, if not, that means we are in newMode. */
          console.log('the current need to edit id is ' + this.id)
            console.log('the current Mode is editMode ? ' + this.editMode)

            this.initForm();
        }
    );
console.log('controls')
console.log(this.getControls())
  }

  private initForm(){
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
        const recipe = this.recipeS.getRecipesById(this.id);
        recipeName = recipe.name;
        recipeImage = recipe.imagePath;
        recipeDescription = recipe.description;


        if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
                recipeIngredients.push(
                    new FormGroup(
                        {
                            'ingredientName':new FormControl(ingredient.name),
                            'ingredientAmount':new FormControl(ingredient.amount)
                        }) );
                }

        }
    }
      this.recipeForm = new FormGroup({
          'name' : new FormControl(recipeName),
          'image' : new FormControl(recipeImage),
          'description' : new FormControl(recipeDescription),
          'ingredients': recipeIngredients

      })

      console.log(this.recipeForm)
   }
    getControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }
    onSubmit(){

    }
    onCancel(){
      this.recipeForm.reset();
      this.editMode = false;

    }

    protected readonly oncancel = oncancel;
}
