import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path : '' , redirectTo:'/recipes', pathMatch: 'full'},
  {path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule)
    //loadChildren属性是用于懒加载的，它的值是一个函数，
    // 通过import()动态导入'./recipes/recipes.module'模块，然后加载其中的RecipesModule。
    // 这样做可以将RecipesModule作为一个独立的模块进行懒加载，只有在用户访问/recipes路径时，才会加载RecipesModule。
    //recipes/recipes.module 这个路径并没有在路由中定义，因此 Angular 不会知道它对应什么组件或模块。
  },
  {path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule)
  },

  {path : 'auth',
    loadChildren : () => import('./auth/auth-module').then(mod => mod.AuthModule)

  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
