import { Component, Input, OnInit } from '@angular/core';
import { ImageDto, RecipeDto, RecipeTypeDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-grid-item',
  templateUrl: './recipe-grid-item.component.html',
  styleUrls: ['./recipe-grid-item.component.scss']
})
export class RecipeGridItemComponent implements OnInit {
  @Input()
  recipe: RecipeDto
  constructor() { }

  ngOnInit(): void {
  }

  getRecipeType(recipeType: RecipeTypeDto): string {
    let ancestors = "";
    if (recipeType.parent) {
      ancestors = this.getRecipeType(recipeType.parent);
      return ancestors + ' > ' + recipeType.name;
    }
    return recipeType.name
  }

}
