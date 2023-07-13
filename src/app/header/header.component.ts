import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  @Output() featureSelected = new EventEmitter<string>();


  constructor(private ds : DataStorageService ,
              private rs : RecipeService,
              private as : AuthService) {
  }

  recipeAmount : number;
  recipes : Recipe[];
  private userSub : Subscription;
  isAuthenticated = false;

  /*onSelect(feature: string){
    this.featureSelected.emit(feature);  //将feature这个string recipe/shopping-list发送到app
  }*/

  ngOnInit(){

    this.rs.recipesChange.subscribe(
        (recipes: Recipe[])  => {
          this.recipes  = recipes;
          this.recipeAmount = this.recipes.length;
          console.log('check it out')
          console.log(this.recipes)
          //总结一下这个方法。 本质上是获取到在service里的db的数据长度。
          //因为recipeschange是一个subject 因此我们需订阅
          //订阅到的是一个observable 格式 需要利用回调函数 获取内部的值
          //获取到的值 通过双向绑定 在一个bootstrap的徽章上显示出来
    }
    )
    this.userSub = this.as.user.subscribe( user =>{
      this.isAuthenticated = !user? false : true;
      //判断 如果有一个已验证的用户，则true，反之 false

    });
    //这段代码说明了 observable。subscribe()返回的是一个 subscription




  }

  onSaveData(){
  this.ds.storeRecipes();

  }

  onFetchData(){
  this.ds.fetchRecipes().subscribe();
  console.log('click fetch')
    console.log(this.recipes)
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
