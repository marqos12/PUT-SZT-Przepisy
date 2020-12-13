import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-step-form',
  templateUrl: './recipe-step-form.component.html',
  styleUrls: ['./recipe-step-form.component.scss']
})
export class RecipeStepFormComponent implements OnInit {
text;
newStepForm:FormGroup;

constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.newStepForm = this.formBuilder.group({
      description: ''
    })
  }
}
