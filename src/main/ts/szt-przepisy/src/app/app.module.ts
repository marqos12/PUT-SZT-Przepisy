import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { NewRecipeFormComponent } from './components/content/new-recipe-form/new-recipe-form.component';
import { RecipesListComponent } from './components/content/recipes-list/recipes-list.component';
import { FieldsetModule } from 'primeng/fieldset';
import { RecipeDetailsFormComponent } from './components/content/new-recipe-form/recipe-details-form/recipe-details-form.component';
import { RecipeImageComponent } from './components/content/new-recipe-form/recipe-image/recipe-image.component';
import { RecipeStepsComponent } from './components/content/new-recipe-form/recipe-steps/recipe-steps.component';
import { RecipeIngredientsComponent } from './components/content/new-recipe-form/recipe-ingredients/recipe-ingredients.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NewIngredientFormComponent } from './components/content/new-recipe-form/recipe-ingredients/new-ingredient-form/new-ingredient-form.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { RecipeIngredientComponent } from './components/content/new-recipe-form/recipe-ingredients/recipe-ingredient/recipe-ingredient.component';
import { RecipeStepComponent } from './components/content/new-recipe-form/recipe-steps/recipe-step/recipe-step.component';
import { RecipeStepFormComponent } from './components/content/new-recipe-form/recipe-steps/recipe-step-form/recipe-step-form.component';
import { EditorModule } from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewRecipeFormComponent,
    RecipesListComponent,
    RecipeDetailsFormComponent,
    RecipeImageComponent,
    RecipeStepsComponent,
    RecipeIngredientsComponent,
    NewIngredientFormComponent,
    RecipeIngredientComponent,
    RecipeStepComponent,
    RecipeStepFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    FieldsetModule,
    EditorModule,
    ButtonModule,
    ToggleButtonModule,
    InputTextareaModule,
    DropdownModule,
    InputTextModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
