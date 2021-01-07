import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto, RecipeType } from 'src/app/api/api';

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

  getRecipeType(recipeType: RecipeType): string{
    let ancestors = "";
    if(recipeType.parent){
      ancestors =  this.getRecipeType(recipeType.parent);
      return ancestors + ' > ' + recipeType.name;
    }
    return recipeType.name
  }

}
