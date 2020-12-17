import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IngredientDto, RecipeDto, StepDto } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class NewRecipeService {

  recipe: RecipeDto;
  private ingredientsList: IngredientDto[] = [];
  private ingredients = new BehaviorSubject<IngredientDto[]>([]);
  private stepsList: StepDto[] = [];
  private steps = new BehaviorSubject<StepDto[]>([]);

  constructor() { }

  init() {
    this.ingredientsList = [];
    this.ingredients.next(this.ingredientsList);
    this.stepsList = [];
    this.steps.next(this.stepsList);
  }

  public getRecipeIngredients(): Observable<IngredientDto[]> {
    return this.ingredients.asObservable();
  }

  public addIngredient(ingredient: IngredientDto) {
    this.ingredientsList.push(ingredient);
    this.ingredients.next(this.ingredientsList);
  }

  public getRecipeSteps(): Observable<StepDto[]> {
    return this.steps.asObservable();
  }

  public addStep(step: StepDto) {
    step.number = this.stepsList.length + 1;
    this.stepsList.push(step);
    this.steps.next(this.stepsList);
  }

}
