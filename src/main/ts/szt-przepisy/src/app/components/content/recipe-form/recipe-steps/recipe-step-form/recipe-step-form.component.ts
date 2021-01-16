import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepDto } from 'src/app/api/api';
import { NewRecipeService } from 'src/app/services/new-recipe.service';

@Component({
  selector: 'app-recipe-step-form',
  templateUrl: './recipe-step-form.component.html',
  styleUrls: ['./recipe-step-form.component.scss']
})
export class RecipeStepFormComponent implements OnInit {

  @Output() closeForm = new EventEmitter();
  text;
  newStepForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private newRecipeService: NewRecipeService) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newStepForm = this.formBuilder.group({
      description: ['', Validators.required]
    })
  }
  
  onAddStep() {
    if (this.newStepForm.valid) {
      this.newRecipeService.addStep(this.newStepForm.value);
      this.initForm();
    } else {
      this.newStepForm.controls.description.markAsDirty();
    }
  }
  
  close() {
    this.closeForm.emit();
  }
}
