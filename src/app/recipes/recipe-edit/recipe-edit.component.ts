import {Component, OnInit, resolveForwardRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id : number;
  editMode = false;
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute , private recipeS: RecipeService, private  router : Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(
        (para : Params) => {
          this.id = +para['id'];
          this.editMode = para['id']!=null;
         /* to check if there is an id in the params, if not, that means we are in newMode. */
            this.initForm();
        }
    );
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
                            'name':new FormControl(ingredient.name ,Validators.required),
                            'amount':new FormControl(ingredient.amount, [Validators.required, Validators.min(0)])
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

   }

    onSubmit(){
      const newRecipe = new Recipe(
              this.recipeForm.value['name'],
              this.recipeForm.value['description'],
              this.recipeForm.value['image'],
              this.recipeForm.value['ingredients']
      );


      if(this.editMode){
          this.recipeS.updateRecipe(this.id, newRecipe)
          //we can just use this.recipeForm.value.
          // cause the object recipeForm schould have a valid format to fit one Recipe
          console.log('update mode')
          console.log( this.recipeForm.value['ingredients'])
      }else {
          this.recipeS.addRecipe(newRecipe);
      }

       this.router.navigate(['/recipes'])
    }

    getControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }
    onCancel(){
      this.recipeForm.reset();
      this.editMode = false;
      this.router.navigate(['../'], {relativeTo : this.route})

        // 如果您只使用 this.router.navigate(['../'])，它会导航到相对于当前 URL 的上一级 URL，
        // 即 http://localhost:4200/recipes/。
        //     但是，如果您使用 this.router.navigate(['../'], { relativeTo: this.route })，
        //     它会根据当前路由的信息确定相对路径。
        //     在这种情况下，relativeTo: this.route 表示相对于当前路由进行导航，因此它会导航到父级路由，
        //     即 http://localhost:4200/recipes/0。

    }


    onAddIngredient(){
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup(
                {
                    'name': new FormControl(null,Validators.required),
                    'amount' : new FormControl(null,Validators.required)
                    // dont have a initial value, therefor with empty ()

                }
            )
        )

    }

}
