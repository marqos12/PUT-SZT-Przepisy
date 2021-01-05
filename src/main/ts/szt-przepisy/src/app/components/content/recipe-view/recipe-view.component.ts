import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  constructor(private recipesService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipesService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;
      this.isRecipeLoaded = true;
    })
  }

}
