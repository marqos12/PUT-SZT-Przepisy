import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-details-view',
  templateUrl: './recipe-details-view.component.html',
  styleUrls: ['./recipe-details-view.component.scss']
})
export class RecipeDetailsViewComponent implements OnInit {

  @Input() recipe:RecipeDto;

  constructor() { }

  ngOnInit(): void {
  }

}
