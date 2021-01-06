import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/content/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/content/auth/register-form/register-form.component';
import { NewRecipeFormComponent } from './components/content/new-recipe-form/new-recipe-form.component';
import { RecipeViewComponent } from './components/content/recipe-view/recipe-view.component';
import { RecipesListComponent } from './components/content/recipes-list/recipes-list.component';


const routes: Routes = [
  { path: "add", component: NewRecipeFormComponent },
  { path: "recipe/:id", component: RecipeViewComponent },
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegisterFormComponent },
  { path: "", component: RecipesListComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
