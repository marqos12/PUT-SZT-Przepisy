import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RecipeDto } from 'src/app/api/api';
import { RecipesService } from 'src/app/services/recipes.service';
import { SingleRecipeService } from 'src/app/services/single-recipe.service';
import { RecipeDetailsFormComponent } from './recipe-details-form/recipe-details-form.component';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  @ViewChild(RecipeDetailsFormComponent) recipeDetailsForm: RecipeDetailsFormComponent;

  recipe: RecipeDto;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private singleRecipeService: SingleRecipeService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipe(id);
    } else {
      this.singleRecipeService.init();
    }
  }

  getRecipe(id) {
    this.recipesService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;
      this.singleRecipeService.initByRecipe(recipe);
      this.checkUserIsAuthor();
    })
  }

  checkUserIsAuthor() {
    this.recipesService.checkUserIsAuthor({
      recipe: this.recipe,
      successCallback: () => { },
      errorCallback: this.onUserNotAuthor
    })
  }

  onUserNotAuthor() {
    this.router.navigate(['/']);
    this.messageService.add({ severity: 'success', summary: "Brak uprawnień do edycji wybranego przepisu!" });
  }

  save() {
    this.recipeDetailsForm.createRecipeAndSave();
  }

}
