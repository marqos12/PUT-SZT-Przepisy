import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/api/api';

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

  show() {

  }
}
