import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientDto } from 'src/app/api/api';
import { NewRecipeService } from 'src/app/services/new-recipe.service';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss']
})
export class RecipeIngredientsComponent implements OnInit, OnDestroy {

  ingredients: IngredientDto[] = [];
  private ingredientsSubscription: Subscription;

  showNewIngredientForm = true;

  constructor(private newRecipeService: NewRecipeService) { }

  ngOnInit(): void {
    this.ingredientsSubscription = this.registerIngredientsListener();
  }

  registerIngredientsListener(): Subscription {
    return this.newRecipeService.getRecipeIngredients()
      .subscribe(ingredients => this.ingredients = ingredients)
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

  toggleShowIngredientForm() {
    this.showNewIngredientForm = !this.showNewIngredientForm;
  }

}
