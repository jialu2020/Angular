import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
subscription: Subscription;
editedItemIndex: number;
editedItem: Ingredients;
@ViewChild('f') slForm : NgForm;



  ngOnInit(){
  
  }
 newShopping:Ingredients;
  editMode = false;

 constructor(private sLService : ShoppingListService){
     this.subscription= this.sLService.startedEditing.subscribe(
         (index :number)=>{
             this.editedItemIndex = index;
             this.editMode = true;
             this.editedItem = this.sLService.getIngredient(index);
            this.slForm.setValue(
                {
                    name : this.editedItem.name,
                    amount : this.editedItem.amount

                }
            )

         }

     );

 }

  onAddItem(form : NgForm){
     const value = form.value;

     const newIng = new Ingredients(value.name, value.amount);
     this.sLService.addIngredients(newIng);


  }

    ngOnDestroy(): void {
     this.subscription.unsubscribe();
    }

}
