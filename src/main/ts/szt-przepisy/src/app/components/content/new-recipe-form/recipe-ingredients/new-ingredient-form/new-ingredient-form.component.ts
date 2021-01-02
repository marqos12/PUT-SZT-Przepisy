import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientDto, RecipeIngredientDto } from 'src/app/api/api';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { NewRecipeService } from 'src/app/services/new-recipe.service';

@Component({
  selector: 'app-new-ingredient-form',
  templateUrl: './new-ingredient-form.component.html',
  styleUrls: ['./new-ingredient-form.component.scss']
})
export class NewIngredientFormComponent implements OnInit, OnDestroy {

  @Output() closeForm = new EventEmitter();

  newIngredientForm: FormGroup;
  ingredients: IngredientDto[] = [];
  suggestedIngredients: IngredientDto[] = [];
  text: string;
  private ingredientsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private ingredientsService: IngredientsService,
    private newRecipeService: NewRecipeService
  ) { }


  searchIngredient(event) {
    const name = event.query.trim();
    this.suggestedIngredients = this.ingredients.filter(this.filterIngredientsByName(name));
  }

  filterIngredientsByName(name: string) {
    return (ingredient: IngredientDto) => ingredient.name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
  }

  ngOnInit(): void {
    this.registerIngredientsListener();
    this.initForm();
  }

  initForm() {
    this.newIngredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      required: true,
    })
  }

  registerIngredientsListener() {
    this.ingredientsSubscription = this.ingredientsService.registerListener(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

  onIngredientSelect(event) {
    this.newIngredientForm.controls.unit.setValue(event.unit);
  }

  onAddIngredient() {
    if (this.newIngredientForm.valid) {
      this.newRecipeService.addIngredient(this.createIngredient(this.newIngredientForm.value));
      this.initForm();
    } else {
      this.markAllControlsAsTouched()
    }
  }

  createIngredient(formValue): RecipeIngredientDto {
    const ingredient = formValue;
    ingredient.id = ingredient.name.id
    ingredient.name = ingredient.name.name || ingredient.name
    return ingredient;
  }

  markAllControlsAsTouched() {
    for (const field in this.newIngredientForm.controls) {
      this.newIngredientForm.controls[field].markAsDirty();
    }
  }

  close() {
    this.closeForm.emit();
  }

}
