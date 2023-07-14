import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import { Router} from "@angular/router";

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

    constructor(private as : AuthService, private router : Router ) {
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
               this.error =errorRes;
               this.isLoading = false;
           });

           this.authForm.reset();
       }else return;


    }

}
