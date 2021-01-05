import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-ingredients-view',
  templateUrl: './recipe-ingredients-view.component.html',
  styleUrls: ['./recipe-ingredients-view.component.scss']
})
export class RecipeIngredientsViewComponent implements OnInit {

  @Input() recipe:RecipeDto;
  constructor() { }

  ngOnInit(): void {
  }

}
