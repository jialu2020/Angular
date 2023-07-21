import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
    //这意味着这个指令可以通过属性选择器在HTML模板中应用到元素上。
})
export class PlaceholderDirective{
    constructor( public viewContainerRef : ViewContainerRef) {


    }
}
