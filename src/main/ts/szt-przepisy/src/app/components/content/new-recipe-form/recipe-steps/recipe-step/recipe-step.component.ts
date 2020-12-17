import { Component, Input, OnInit } from '@angular/core';
import { StepDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-step',
  templateUrl: './recipe-step.component.html',
  styleUrls: ['./recipe-step.component.scss']
})
export class RecipeStepComponent implements OnInit {

  @Input()
  step: StepDto;

  constructor() { }

  ngOnInit(): void {
  }

}
