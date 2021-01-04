import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientDto, RecipeComplexity, RecipeTypeDto } from 'src/app/api/api';
import { ComplexityLevelsService } from 'src/app/services/complexity-levels.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipeTypesService } from 'src/app/services/recipe-types.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes-list-filters',
  templateUrl: './recipes-list-filters.component.html',
  styleUrls: ['./recipes-list-filters.component.scss']
})
export class RecipesListFiltersComponent implements OnInit, OnDestroy {

  filtersForm: FormGroup;

  recipeTypes: RecipeTypeDto[] = [];
  recipeTypesSubscription: Subscription;
  complexityLevels: RecipeComplexity[] = [];
  complexityLevelsSubscription: Subscription;
  ingredients: IngredientDto[] = [];
  private ingredientsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private recipeTypesService: RecipeTypesService,
    private complexityLevelsService: ComplexityLevelsService,
    private ingredientsService: IngredientsService,
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.registerRecipeTypesListener();
    this.registerComplexityLevelsListener();
    this.registerIngredientsListener();
  }

  initForm() {
    this.filtersForm = this.formBuilder.group({
      name: '',
      durationFrom: 15,
      durationTo: 60,
      durationSlider: [[15, 60]],
      complexity: '',
      type: '',
      ingredients: '',
    })
    this.registerFormChangeListeners();
  }

  registerFormChangeListeners() {
    this.filtersForm.controls.durationFrom.valueChanges.subscribe(val => {
      this.setSliderControlValue(this.filtersForm.controls.durationFrom, 0, val)
    })

    this.filtersForm.controls.durationTo.valueChanges.subscribe(val => {
      this.setSliderControlValue(this.filtersForm.controls.durationTo, 1, val)
    })
  }

  setSliderControlValue(control, nr, value) {
    if (value === null || value < 0) control.setValue(0);
    else if (value > 300) control.setValue(300);
    let sliderValue = this.filtersForm.value.durationSlider;
    sliderValue[nr] = value;
    this.filtersForm.controls.durationSlider.setValue(sliderValue);
  }

  durationSliderChange(event) {
    this.filtersForm.controls.durationFrom.setValue(event.values[0]);
    this.filtersForm.controls.durationTo.setValue(event.values[1]);
  }

  registerRecipeTypesListener() {
    this.recipeTypesSubscription = this.recipeTypesService.registerListener(this.onRecipeTypesReceive.bind(this));
  }

  onRecipeTypesReceive(types: RecipeTypeDto[]) {
    this.recipeTypes = types;
  }

  registerComplexityLevelsListener() {
    this.complexityLevelsSubscription = this.complexityLevelsService.registerListener(this.onComplexityLevelReceive.bind(this));
  }
  onComplexityLevelReceive(levels: RecipeComplexity[]) {
    this.complexityLevels = levels;
  }
  registerIngredientsListener() {
    this.ingredientsSubscription = this.ingredientsService.registerListener(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.recipeTypesSubscription.unsubscribe();
    this.complexityLevelsSubscription.unsubscribe();
    this.ingredientsSubscription.unsubscribe();
  }

  filter() {
    this.recipesService.refreshRecipesAfterFiltersChanged(this.createParams(this.filtersForm.value));
  }

  private createParams(filters): String {
    let paramsNumber = 0
    let params = '';

    for (const field in filters) {
      const value = filters[field]
      if (value) {
        if (paramsNumber > 0) params += '&'
        if (['name', 'durationFrom', 'durationTo'].includes(field)) {
          params += `${field}=${value}`;
        } else if (['type', 'ingredients'].includes(field) && value instanceof Array && value.length > 0) {
          params += this.addToParams(value, type => `${field}=${type.id}`)
        } else if (field === 'complexity' && value instanceof Array && value.length > 0) {
          params += this.addToParams(value, complexity => `${field}=${complexity}`)
        }
        paramsNumber++;
      }
    }

    return params;
  }

  addToParams(values, method: Function) {
    let params = ""
    for (let i = 0; i < values.length; i++) {
      if (i > 0) params += '&';
      params += method(values[i])
    }
    return params;
  }
}
