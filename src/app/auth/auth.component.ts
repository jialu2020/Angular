import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import { Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
    authForm : FormGroup;
    isLoginMode : boolean;
    isLoading = false;
    error :string = null ;
    isLoggedIn= false;
    @ViewChild(PlaceholderDirective, {static:false})  alertHost : PlaceholderDirective;

    private closeSub :Subscription;

    constructor(private as : AuthService, private router : Router, private cFactory : ComponentFactoryResolver) {
    }

onHandleError(){
this.error = null;
}


   onSwitchMode(){
     this.isLoginMode = !this.isLoginMode;
     console.log(this.isLoginMode)
   }

    ngOnInit(): void {
       this.authForm = new FormGroup(
           {
               'email': new FormControl('max@test.com',
                   [Validators.required,Validators.email]),

               'password' : new FormControl('' ,
                   [Validators.required , Validators.minLength(1) ])
           }
       )

    }

    onSubmit(){

       if(this.authForm.valid){

           const email = this.authForm.get('email').value
           const password = this.authForm.value['password'];
           let authObs : Observable<AuthResponseData>

           this.isLoading = true;
           //等效

           if(this.isLoginMode){
               authObs = this.as.login(email,password);
           }else {
               authObs = this.as.signup(email,password);


           }
        authObs.subscribe(
           response =>{
               console.log(response)
               this.isLoading= false;
               this.router.navigate(['/recipes'],);
               this.isLoggedIn = true;
           },errorRes => {
               console.log(errorRes);
               //this.error =errorRes;
               this.showErrorAlert(errorRes);
               this.isLoading = false;

           });

           this.authForm.reset();
       }else return;


    }

    private showErrorAlert(message : string){
        const alertCmpFactory =
            this.cFactory.resolveComponentFactory(AlertComponent);

        // 在Angular中，ComponentFactoryResolver 是一个服务，它用于解析组件工厂（ComponentFactory）。
        // 组件工厂是一个用于动态创建组件实例的对象，它包含了组件的信息和创建组件实例所需的所有信息。

        // const alertCmp = new AlertComponent();
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef =
            hostViewContainerRef.createComponent(alertCmpFactory);

        // 这行代码使用之前获取的组件工厂 alertCmpFactory，
        // 通过 createComponent() 方法在 alertContainer 视图容器中动态创建了一个 AlertComponent 实例，
        // 并将它存储在 componentRef 变量中。

       componentRef.instance.message = message;
       this.closeSub = componentRef.instance.close.subscribe(()=> {
           this.closeSub.unsubscribe();
           hostViewContainerRef.clear();

       });
    }

}
