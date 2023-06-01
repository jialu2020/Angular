import { Component , OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit{
  selectedRecipe: Recipe;


  constructor(private recipeService : RecipeService){}

  ngOnInit(){
    this.recipeService.recipeSelected.subscribe(
      (recipe : Recipe) => {
        this.selectedRecipe = recipe;
      }

    );

  }

// 这段代码是在组件的ngOnInit方法中订阅了recipeService的recipeSelected事件。
// 当这个事件被触发时，会执行传入的回调函数，该函数接收一个名为recipe的参数，类型为Recipe。
// 回调函数中的逻辑很简单，它将接收到的recipe赋值给组件的selectedRecipe属性。
// 这样，当recipeSelected事件被触发时，selectedRecipe属性会更新为选中的食谱对象。
// 换句话说，这段代码的作用是监听recipeSelected事件，当事件触发时，将选中的食谱对象保存在selectedRecipe属性中，以供其他组件或模板使用。

}
