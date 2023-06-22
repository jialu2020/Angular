import {Component, OnInit, resolveForwardRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
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
                            'ingredientName':new FormControl(ingredient.name ,Validators.required),
                            'ingredientAmount':new FormControl(ingredient.amount, [Validators.required, Validators.min(0)])
                        }) );
                }

        }
    }
      this.recipeForm = new FormGroup({
          'name' : new FormControl(recipeName ,Validators.required),
          'image' : new FormControl(recipeImage, Validators.required),
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


    onAddIngredient(){
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup(
                {
                    'ingredientName': new FormControl(null,Validators.required),
                    'ingredientAmount' : new FormControl(null,Validators.required)
                    // dont have a initial value, therefor with empty ()

                }
            )
        )

    }

}
