import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-image-view',
  templateUrl: './recipe-image-view.component.html',
  styleUrls: ['./recipe-image-view.component.scss']
})
export class RecipeImageViewComponent implements OnInit {

  @Input() recipe:RecipeDto;
  constructor() { }

  ngOnInit(): void {
  }

}
