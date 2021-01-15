import { Component, Input, OnInit } from '@angular/core';
import { ImageDto, RecipeDto, RecipeTypeDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {

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
