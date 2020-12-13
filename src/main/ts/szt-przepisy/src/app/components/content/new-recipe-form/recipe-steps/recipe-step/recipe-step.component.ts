import { Component, OnInit } from '@angular/core';
import { StepDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-step',
  templateUrl: './recipe-step.component.html',
  styleUrls: ['./recipe-step.component.scss']
})
export class RecipeStepComponent implements OnInit {

  step: StepDto = {
    id:null,
    description: "Jakiś dłuższy tekst tego co się będzie tutaj działo.",
    number: 1
  }

  constructor() { }

  ngOnInit(): void {
  }

}
