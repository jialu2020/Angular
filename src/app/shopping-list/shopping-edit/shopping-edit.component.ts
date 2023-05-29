import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef :ElementRef;
  @ViewChild('amountInput') amountInputRef :ElementRef;
  @Output() IngredientAdded = new EventEmitter<Ingredients>();

  ngOnInit(){
  
  }
 newShopping:Ingredients;

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value 
    const newIng = new Ingredients(ingName, ingAmount);
    this.IngredientAdded.emit(newIng);

    console.log("hii" + ingName);
    


  }

}
