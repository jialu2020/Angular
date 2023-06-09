import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id : number;
  editMode = false;

  constructor(private route : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(
        (para : Params) => {
          this.id = +para['id'];
          this.editMode = para['id']!=null;
         /* to check if there is an id in the params, if not, that means we are in newMode. */
          console.log('the current need to edit id is ' + this.id)
            console.log('the current Mode is editMode ? ' + this.editMode)
        }
    );
  }

}
