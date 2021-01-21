import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecipeIngredientDto, RecipeDto, StepDto, UserDto } from '../api/api';
import { ImagesService } from './images.service';
import { RestService } from './rest.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SingleRecipeService {

  recipe: RecipeDto;
  user: UserDto;
  private ingredientsList: RecipeIngredientDto[] = [];
  private ingredients = new BehaviorSubject<RecipeIngredientDto[]>([]);
  private stepsList: StepDto[] = [];
  private steps = new BehaviorSubject<StepDto[]>([]);

  constructor(
    private restService: RestService,
    private router: Router,
    private userAuthService: UserAuthService,
    private imagesService: ImagesService
  ) {
    this.init();
    this.registerUserListener();
  }

  init() {
    this.ingredientsList = [];
    this.ingredients.next(this.ingredientsList);
    this.stepsList = [];
    this.steps.next(this.stepsList);
  }

  initByRecipe(recipe: RecipeDto) {
    this.recipe = recipe;
    this.ingredientsList = recipe.ingredients;
    this.ingredients.next(this.ingredientsList);
    this.stepsList = recipe.steps;
    this.stepsList.sort(this.compareStepsByNumber);
    this.steps.next(this.stepsList);
  }

  deleteRecipeImage(image) {
    this.removeObjectFromArray(image, this.recipe.images);
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

  public editIngredient(ingredient: RecipeIngredientDto) {
    this.updateIngredient(this.ingredientsList.filter(i => i.id == ingredient.id)[0], ingredient);
  }

  private updateIngredient(oldIngredient: RecipeIngredientDto, ingredient: RecipeIngredientDto) {
    oldIngredient.name = ingredient.name;
    oldIngredient.quantity = ingredient.quantity;
    oldIngredient.required = ingredient.required;
    oldIngredient.unit = ingredient.unit;
  }

  public deleteIngredient(ingredient: RecipeIngredientDto) {
    this.removeObjectFromArray(ingredient, this.ingredientsList);
  }

  private removeObjectFromArray(obj, array: any[]) {
    const index = array.map(this.getObjAsJSON).indexOf(this.getObjAsJSON(obj));
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  private getObjAsJSON(obj) {
    return JSON.stringify(obj);
  }

  public getRecipeSteps(): Observable<StepDto[]> {
    return this.steps.asObservable();
  }

  public addStep(step: StepDto) {
    step.number = this.stepsList.length + 1;
    this.stepsList.push(step);
    this.steps.next(this.stepsList);
  }

  public editStep(step: StepDto) {
    this.updateStep(this.stepsList.filter(s => s.id == step.id)[0], step);
  }

  private updateStep(oldStep: StepDto, step: StepDto) {
    oldStep.description = step.description;
    oldStep.id = step.id;
    oldStep.number = step.number;
  }

  public deleteStep(step: StepDto) {
    this.removeObjectFromArray(step, this.stepsList);
    this.updateStepNumbers();
  }

  public updateStepNumbers() {
    for (let i = 0; i < this.stepsList.length; i++) {
      this.stepsList[i].number = i + 1;
    }
  }

  public changeStepNumber(step: StepDto, number) {
    const oldStep = this.stepsList.filter(oldStep => this.getObjAsJSON(oldStep) === this.getObjAsJSON(step))[0];
    oldStep.number = number
    this.stepsList.sort(this.compareStepsByNumber);
    this.updateStepNumbers();
  }

  private compareStepsByNumber(step1: StepDto, step2: StepDto) {
    return step1.number - step2.number;
  }

  public saveRecipe(recipe: RecipeDto) {
    const fullRecipe = this.buildRecipe(recipe);
    this.restService.post("/api/recipe", fullRecipe).subscribe(this.onRecipeSaveSuccess.bind(this));
  }

  private onRecipeSaveSuccess(recipe: RecipeDto) {
    this.imagesService.saveImages(recipe.id.toString()).subscribe(this.onImagesSaveSuccess.bind(this));
  }

  private onImagesSaveSuccess(recipe: RecipeDto) {
    this.imagesService.reset();
    this.router.navigate(['/recipe/' + recipe.id]);
  }

  private buildRecipe(recipe: RecipeDto) {
    recipe.ingredients = this.ingredientsList;
    recipe.steps = this.stepsList;
    recipe.images = this.recipe?.images || [];
    return recipe;
  }
}
