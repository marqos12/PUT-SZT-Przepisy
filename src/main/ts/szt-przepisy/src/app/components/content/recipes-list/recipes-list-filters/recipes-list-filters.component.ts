import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientDto, RecipeComplexity, RecipeTypeDto, UserDto } from 'src/app/api/api';
import { ComplexityLevelsService } from 'src/app/services/complexity-levels.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipeTypesService } from 'src/app/services/recipe-types.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-recipes-list-filters',
  templateUrl: './recipes-list-filters.component.html',
  styleUrls: ['./recipes-list-filters.component.scss']
})
export class RecipesListFiltersComponent implements OnInit, OnDestroy {

  filtersForm: FormGroup;
  user: UserDto;
  userSubscription: Subscription;
  showPlannedFilter = false;

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
    private recipesService: RecipesService,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.registerRecipeTypesListener();
    this.registerComplexityLevelsListener();
    this.registerIngredientsListener();
    this.registerUserChangeListener();
  }

  initForm() {
    const isPlannedActive = this.route.snapshot.url[0]?.path === "planned";
    this.filtersForm = this.formBuilder.group({
      name: '',
      durationFrom: 0,
      durationTo: 60,
      durationSlider: [[0, 60]],
      complexity: '',
      type: '',
      ingredients: '',
      wantsToCook: isPlannedActive,
    })
    setTimeout(this.filter.bind(this), 10);
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
    this.userSubscription.unsubscribe();
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
        if (['name', 'durationFrom', 'durationTo', 'wantsToCook'].includes(field)) {
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

  registerUserChangeListener() {
    this.userSubscription = this.userAuthService.getLoggedUser().subscribe(this.onUserLogin.bind(this));
  }

  onUserLogin(user) {
    this.user = user;
    if (user) {
      this.showPlannedFilter = true;
    } else {
      this.showPlannedFilter = false;
    }
  }
}
