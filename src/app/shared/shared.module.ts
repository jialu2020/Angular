import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert/alert.component";
import {LoadingSpinnerComponent} from "./loadingSpinner/loadingSpinner";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";

@NgModule( {
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ], imports:[
        CommonModule,

    ], exports: [

        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
       // 导出 CommonModule，使其他模块不需要再单独导入它
    ]
    }

)
export class SharedModule{}
