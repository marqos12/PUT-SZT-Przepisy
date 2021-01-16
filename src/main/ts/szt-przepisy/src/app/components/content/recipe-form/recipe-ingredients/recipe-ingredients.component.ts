import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeIngredientDto } from 'src/app/api/api';
import { SingleRecipeService } from 'src/app/services/single-recipe.service';
import { NewIngredientFormComponent } from './new-ingredient-form/new-ingredient-form.component';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss']
})
export class RecipeIngredientsComponent implements OnInit, OnDestroy {

  @ViewChild(NewIngredientFormComponent) ingredientFormComponent;

  ingredients: RecipeIngredientDto[] = [];
  private ingredientsSubscription: Subscription;

  showNewIngredientForm = true;

  constructor(private singleRecipeService: SingleRecipeService) { }

  ngOnInit(): void {
    this.ingredientsSubscription = this.registerIngredientsListener();
  }

  registerIngredientsListener(): Subscription {
    return this.singleRecipeService.getRecipeIngredients()
      .subscribe(ingredients => this.ingredients = ingredients)
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

  toggleShowIngredientForm() {
    this.showNewIngredientForm = !this.showNewIngredientForm;
  }

  onIngredientEditRequest(ingredient: RecipeIngredientDto) {
    this.ingredientFormComponent.initFormByIngredient(ingredient)
  }

  onIngredientRemoveRequest(ingredient: RecipeIngredientDto) {
    this.singleRecipeService.deleteIngredient(ingredient);
  }
}
