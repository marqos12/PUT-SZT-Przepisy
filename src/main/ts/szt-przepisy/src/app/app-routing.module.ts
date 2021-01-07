import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/content/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/content/auth/register-form/register-form.component';
import { NewRecipeFormComponent } from './components/content/new-recipe-form/new-recipe-form.component';
import { RecipeViewComponent } from './components/content/recipe-view/recipe-view.component';
import { RecipesListComponent } from './components/content/recipes-list/recipes-list.component';
import { IsUserLoggedGuardService } from './services/guards/is-user-logged-guard.service';


const routes: Routes = [
  { path: "add", component: NewRecipeFormComponent, canActivate: [IsUserLoggedGuardService], data: { invertAuth: false } },
  { path: "recipe/:id", component: RecipeViewComponent },
  { path: "login", component: LoginFormComponent, canActivate: [IsUserLoggedGuardService], data: { invertAuth: true } },
  { path: "register", component: RegisterFormComponent, canActivate: [IsUserLoggedGuardService], data: { invertAuth: true } },
  { path: "", component: RecipesListComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
