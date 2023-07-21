import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {CommonModule} from "@angular/common";

@NgModule(
    {
        declarations:[
            AuthComponent ,

        ],
        imports:[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forChild([{path : '',component : AuthComponent}]),
            SharedModule],




    }
)
export class AuthModule{

}
