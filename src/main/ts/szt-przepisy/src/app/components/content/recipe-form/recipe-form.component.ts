import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeDetailsFormComponent } from './recipe-details-form/recipe-details-form.component';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  @ViewChild(RecipeDetailsFormComponent) recipeDetailsForm: RecipeDetailsFormComponent;

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.recipeDetailsForm.createRecipeAndSave();
  }

}
