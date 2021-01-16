import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeDto, StepDto } from 'src/app/api/api';
import { SingleRecipeService } from 'src/app/services/single-recipe.service';
import { RecipeStepFormComponent } from './recipe-step-form/recipe-step-form.component';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './recipe-steps.component.html',
  styleUrls: ['./recipe-steps.component.scss']
})
export class RecipeStepsComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(RecipeStepFormComponent) recipeStepFormComponent;
  @Input() recipe: RecipeDto;
  steps: StepDto[] = [];
  private stepsSubscription: Subscription;

  showNewStepForm = true;

  constructor(private singleRecipeService: SingleRecipeService) { }

  ngOnInit(): void {
    this.stepsSubscription = this.registerStepsListener();
  }

  ngOnChanges() {
    if (this.recipe && this.recipe.steps) {
      this.steps = this.recipe.steps;
    }
  }

  registerStepsListener(): Subscription {
    return this.singleRecipeService.getRecipeSteps()
      .subscribe(steps => this.steps = steps)
  }

  ngOnDestroy() {
    this.stepsSubscription.unsubscribe();
  }

  toggleShowIngredientForm() {
    this.showNewStepForm = !this.showNewStepForm;
  }

  onStepEditRequest(step: StepDto) {
    this.recipeStepFormComponent.initFormByStep(step)
  }

  onStepRemoveRequest(step: StepDto) {
    this.singleRecipeService.deleteStep(step);
  }

  onChangeNumber(step: StepDto, value) {
    const newValue = step.number + value;
    this.singleRecipeService.changeStepNumber(step, newValue);
  }
}
