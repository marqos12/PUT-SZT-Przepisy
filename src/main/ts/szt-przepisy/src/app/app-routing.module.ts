import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewRecipeFormComponent } from './components/content/new-recipe-form/new-recipe-form.component';
import { RecipesListComponent } from './components/content/recipes-list/recipes-list.component';


const routes: Routes = [
  { path:"add", component: NewRecipeFormComponent},
  { path:"", component: RecipesListComponent},
  { path:"**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
