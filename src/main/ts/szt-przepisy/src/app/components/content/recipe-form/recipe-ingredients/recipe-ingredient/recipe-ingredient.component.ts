import { Component, Input, OnInit } from '@angular/core';
import { RecipeIngredientDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.scss']
})
export class RecipeIngredientComponent implements OnInit {

  @Input()
  ingredient: RecipeIngredientDto;

  constructor() { }

  ngOnInit(): void {
  }

}
