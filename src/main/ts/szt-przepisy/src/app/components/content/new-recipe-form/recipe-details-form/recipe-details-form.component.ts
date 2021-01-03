import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeComplexity, RecipeDto, RecipeTypeDto } from 'src/app/api/api';
import { ComplexityLevelsService } from 'src/app/services/complexity-levels.service';
import { RecipeTypesService } from 'src/app/services/recipe-types.service';
import { NewRecipeService } from 'src/app/services/new-recipe.service';

@Component({
  selector: 'app-recipe-details-form',
  templateUrl: './recipe-details-form.component.html',
  styleUrls: ['./recipe-details-form.component.scss']
})
export class RecipeDetailsFormComponent implements OnInit, OnDestroy {
  recipeDetailsForm: FormGroup;
  recipeTypes: RecipeTypeDto[] = [];
  recipeTypesSubscription: Subscription;
  complexityLevels: RecipeComplexity[] = [];
  complexityLevelsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private recipeTypesService: RecipeTypesService,
    private complexityLevelsService: ComplexityLevelsService,
    private newRecipeService: NewRecipeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.registerRecipeTypesListener();
    this.registerComplexityLevelsListener();
  }

  initForm() {
    this.recipeDetailsForm = this.formBuilder.group({
      description: ['', Validators.required],
      image: '',
      duration: [0, Validators.required],
      durationSlider: 0,
      recipeType: ['', Validators.required],
      name: ['', Validators.required],
      complexity: ['', Validators.required],
      portions: ['', Validators.required],
    })
    this.registerFormChangeListeners();
  }

  registerFormChangeListeners() {
    this.recipeDetailsForm.controls.duration.valueChanges.subscribe(val => {
      if (val === null || val < 0) this.recipeDetailsForm.controls.duration.setValue(0);
      else if (val > 300) this.recipeDetailsForm.controls.duration.setValue(300);
      this.recipeDetailsForm.controls.durationSlider.setValue(val);
    })
  }

  registerRecipeTypesListener() {
    this.recipeTypesSubscription = this.recipeTypesService.registerListener(this.onRecipeTypesReceive.bind(this));
  }

  onRecipeTypesReceive(types: RecipeTypeDto[]) {
    this.recipeTypes = types;
    this.recipeDetailsForm.controls.recipeType.setValue(types[0]);
  }

  registerComplexityLevelsListener() {
    this.complexityLevelsSubscription = this.complexityLevelsService.registerListener(this.onComplexityLevelReceive.bind(this));
  }
  onComplexityLevelReceive(levels: RecipeComplexity[]) {
    this.complexityLevels = levels;
    this.recipeDetailsForm.controls.complexity.setValue(levels[0]);
  }

  ngOnDestroy(): void {
    this.recipeTypesSubscription.unsubscribe();
    this.complexityLevelsSubscription.unsubscribe();
  }

  public createRecipeAndSave() {
    if (this.recipeDetailsForm.valid) {
      this.newRecipeService.saveRecipe(this.recipeDetailsForm.value);
    } else {
      this.markAllControlsAsTouched()
    }
  }

  markAllControlsAsTouched() {
    for (const field in this.recipeDetailsForm.controls) {
      this.recipeDetailsForm.controls[field].markAsDirty();
    }
  }

  durationSliderChange(event) {
    this.recipeDetailsForm.controls.duration.setValue(event.value);
  }
}