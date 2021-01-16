import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeIngredientDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.scss']
})
export class RecipeIngredientComponent implements OnInit {

  @Input()
  ingredient: RecipeIngredientDto;

  @Output() onEditClick = new EventEmitter();
  @Output() onRemoveClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.onEditClick.emit();
  }

  remove() {
    this.onRemoveClick.emit();
  }
}
