import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/api/api';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.scss']
})
export class RecipeCommentsComponent implements OnInit {

  @Input() recipe: RecipeDto;


  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
  }

  check() {
    this.recipesService.changeRecipeMark(this.recipe);
  }

}
