import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeDetailsFormComponent } from './recipe-details-form/recipe-details-form.component';

@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.scss']
})
export class NewRecipeFormComponent implements OnInit {

  @ViewChild(RecipeDetailsFormComponent) recipeDetailsForm: RecipeDetailsFormComponent;

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.recipeDetailsForm.createRecipeAndSave();
  }

}
