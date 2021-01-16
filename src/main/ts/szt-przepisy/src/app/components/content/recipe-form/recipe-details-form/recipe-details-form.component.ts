import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeComplexity, RecipeDto, RecipeTypeDto } from 'src/app/api/api';
import { ComplexityLevelsService } from 'src/app/services/complexity-levels.service';
import { RecipeTypesService } from 'src/app/services/recipe-types.service';
import { SingleRecipeService } from 'src/app/services/single-recipe.service';

@Component({
  selector: 'app-recipe-details-form',
  templateUrl: './recipe-details-form.component.html',
  styleUrls: ['./recipe-details-form.component.scss']
})
export class RecipeDetailsFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() recipe: RecipeDto;

  recipeDetailsForm: FormGroup;
  recipeTypes: RecipeTypeDto[] = [];
  recipeTypesSubscription: Subscription;
  complexityLevels: RecipeComplexity[] = [];
  complexityLevelsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private recipeTypesService: RecipeTypesService,
    private complexityLevelsService: ComplexityLevelsService,
    private singleRecipeService: SingleRecipeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.registerRecipeTypesListener();
    this.registerComplexityLevelsListener();
  }

  ngOnChanges() {
    this.initForm();
    this.registerRecipeTypesListener();
    this.registerComplexityLevelsListener();
  }

  initForm() {
    if (this.recipe) {
      this.initFormByRecipe(this.recipe);
    } else {
      this.initEmptyForm();
    }
    this.registerFormChangeListeners();
  }

  initEmptyForm() {
    this.recipeDetailsForm = this.formBuilder.group({
      description: ['', Validators.required],
      duration: [0, Validators.required],
      durationSlider: 0,
      recipeType: ['', Validators.required],
      name: ['', Validators.required],
      complexity: ['', Validators.required],
      portions: ['', Validators.required],
      shortDescription: ['', Validators.required],
    })
  }

  initFormByRecipe(recipe: RecipeDto) {
    this.recipeDetailsForm = this.formBuilder.group({
      description: [recipe.description, Validators.required],
      duration: [recipe.duration, Validators.required],
      durationSlider: recipe.duration,
      recipeType: [recipe.recipeType, Validators.required],
      name: [recipe.name, Validators.required],
      complexity: [recipe.complexity, Validators.required],
      portions: [recipe.portions, Validators.required],
      shortDescription: [recipe.shortDescription, Validators.required],
    })
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

  createRecipeAndSave() {
    if (this.recipeDetailsForm.valid) {
      const recipe = this.recipeDetailsForm.value;
      recipe.id = this.recipe?.id
      recipe.complexity = recipe.complexity.value ? recipe.complexity.value : recipe.complexity;
      this.singleRecipeService.saveRecipe(recipe);
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