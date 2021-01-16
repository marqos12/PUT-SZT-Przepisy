import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDto } from 'src/app/api/api';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  recipe: RecipeDto;
  isRecipeLoaded = false;
  userIsAuthor = false;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipesService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;
      this.isRecipeLoaded = true;
      this.checkUserIsAuthor();
    })
  }

  checkUserIsAuthor() {
    this.recipesService.checkUserIsAuthor({
      recipe: this.recipe,
      successCallback: () => this.userIsAuthor = true,
      errorCallback: () => this.userIsAuthor = false
    })
  }

  edit() {
    this.router.navigate(['/edit/' + this.recipe.id]);
  }
}
