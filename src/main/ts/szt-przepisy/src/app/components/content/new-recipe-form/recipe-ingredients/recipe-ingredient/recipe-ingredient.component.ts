import { Component, OnInit } from '@angular/core';
import { IngredientDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.scss']
})
export class RecipeIngredientComponent implements OnInit {

  ingredient: IngredientDto = {
    id: null,
    name: 'Pierś z kurczaka',
    unit: 'sztuk',
    quantity: 2,
    required: true,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
