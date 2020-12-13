import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-details-form',
  templateUrl: './recipe-details-form.component.html',
  styleUrls: ['./recipe-details-form.component.scss']
})
export class RecipeDetailsFormComponent implements OnInit {
  recipeDetailsForm: FormGroup;
  recipeTypes;
  complexityLevels ;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getRecipeTypes();
    this.getComplexityLevels();
  }

  initForm() {
    this.recipeDetailsForm = this.formBuilder.group({
      description: '',
      image: '',
      duration: '',
      recipeType: '',
      name: '',
      complexity: '',
      portions: '',
    })
  }

  getRecipeTypes() {
    this.recipeTypes = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  getComplexityLevels() {
    this.complexityLevels = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

}



