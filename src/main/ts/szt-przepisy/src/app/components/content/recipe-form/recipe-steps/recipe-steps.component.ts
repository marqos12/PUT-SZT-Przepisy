import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StepDto } from 'src/app/api/api';
import { NewRecipeService } from 'src/app/services/new-recipe.service';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './recipe-steps.component.html',
  styleUrls: ['./recipe-steps.component.scss']
})
export class RecipeStepsComponent implements OnInit, OnDestroy {

  steps: StepDto[] = [];
  private stepsSubscription: Subscription;

  showNewStepForm = true;

  constructor(private newRecipeService: NewRecipeService) { }

  ngOnInit(): void {
    this.stepsSubscription = this.registerStepsListener();
  }

  registerStepsListener(): Subscription {
    return this.newRecipeService.getRecipeSteps()
      .subscribe(steps => this.steps = steps)
  }

  ngOnDestroy() {
    this.stepsSubscription.unsubscribe();
  }

  toggleShowIngredientForm() {
    this.showNewStepForm = !this.showNewStepForm;
  }

}
