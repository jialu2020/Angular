import { Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef :ElementRef;
  @ViewChild('amountInput') amountInputRef :ElementRef;
 

  ngOnInit(){
  
  }
 newShopping:Ingredients;

 constructor(private sLService : ShoppingListService){

 }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value 
    const newIng = new Ingredients(ingName, ingAmount);
    

    this.sLService.addIngredients(newIng);

    console.log("hii" + ingName);
    


  }

}
