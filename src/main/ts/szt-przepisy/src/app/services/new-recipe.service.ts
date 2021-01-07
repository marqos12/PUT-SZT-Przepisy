import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecipeIngredientDto, RecipeDto, StepDto, User } from '../api/api';
import { RestService } from './rest.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewRecipeService {

  recipe: RecipeDto;
  user: User;
  private ingredientsList: RecipeIngredientDto[] = [];
  private ingredients = new BehaviorSubject<RecipeIngredientDto[]>([]);
  private stepsList: StepDto[] = [];
  private steps = new BehaviorSubject<StepDto[]>([]);

  constructor(
    private restService: RestService, 
    private router: Router,
    private userAuthService: UserAuthService
    ) { 
      this.init();
    }

  init() {
    this.ingredientsList = [];
    this.ingredients.next(this.ingredientsList);
    this.stepsList = [];
    this.steps.next(this.stepsList);
    this.registerUserListener();
  }

  registerUserListener() {
    this.userAuthService.getLoggedUser().subscribe(user => this.user = user);
  }

  public getRecipeIngredients(): Observable<RecipeIngredientDto[]> {
    return this.ingredients.asObservable();
  }

  public addIngredient(ingredient: RecipeIngredientDto) {
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

  public saveRecipe(recipe: RecipeDto) {
    const fullRecipe = this.buildRecipe(recipe);
    this.restService.post("/api/recipe", fullRecipe).subscribe(this.onRecipeSaveSuccess.bind(this));
  }

  private onRecipeSaveSuccess(recipe: RecipeDto) {
    this.router.navigate(['/recipe/' + recipe.id]);
  }

  private buildRecipe(recipe: RecipeDto) {
    recipe.ingredients = this.ingredientsList;
    recipe.steps = this.stepsList;
    recipe.user = this.user;
    return recipe;
  }
}
