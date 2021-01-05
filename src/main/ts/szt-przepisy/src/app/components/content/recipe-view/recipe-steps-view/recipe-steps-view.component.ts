import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-steps-view',
  templateUrl: './recipe-steps-view.component.html',
  styleUrls: ['./recipe-steps-view.component.scss']
})
export class RecipeStepsViewComponent implements OnInit {

  @Input() recipe:RecipeDto;
  constructor() { }

  ngOnInit(): void {
  }

}
