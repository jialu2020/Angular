import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";


@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private ds: DataStorageService,
                private rs : RecipeService) {
    }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     let recipesFromHttp;
//         this.ds.fetchRecipes().
//  subscribe( (recipes)=>{
//       recipesFromHttp = recipes});
//
// const recipesFromService  =this.rs.getRecipes();
//
//
// if(recipesFromHttp == recipesFromService){
//     return
// }else{
//     return recipesFromService;
// }

//fetch the new recipice from the serve
const recipes  = this.rs.getRecipes();
if(recipes.length===0){
    //firstly, check if we have got a recipe.
    //if not, fetch the data
    return this.ds.fetchRecipes()
}else {
    //already have recipes, dont need to fetch
    //笔记 刚开始的时候， recipes是空的 需要从db fetch 所需要的data
    // 当reicpe 通过edit按钮被改动的时候，证明 recipes一定不为空（只有list里有recipe才会显示detail的页面）
    //这时候 只需要return recipe就好了

    return recipes;
}



}
}
