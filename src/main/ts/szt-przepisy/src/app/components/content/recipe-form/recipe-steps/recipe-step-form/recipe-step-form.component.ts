import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepDto } from 'src/app/api/api';
import { SingleRecipeService } from 'src/app/services/single-recipe.service';

@Component({
  selector: 'app-recipe-step-form',
  templateUrl: './recipe-step-form.component.html',
  styleUrls: ['./recipe-step-form.component.scss']
})
export class RecipeStepFormComponent implements OnInit {

  @Output() closeForm = new EventEmitter();
  text;
  newStepForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private singleRecipeService: SingleRecipeService) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newStepForm = this.formBuilder.group({
      description: ['', Validators.required]
    })
  }

  initFormByStep(step: StepDto) {
    this.newStepForm = this.formBuilder.group({
      description: [step.description, Validators.required],
      id: [step.id],
      number: [step.number],
      isNew: step.isNew
    })
  }

  onAddStep() {
    if (this.newStepForm.valid) {
      this.addOrEditStep();
      this.initForm();
    } else {
      this.newStepForm.controls.description.markAsDirty();
    }
  }

  addOrEditStep() {
    if (this.newStepForm.value.id || this.newStepForm.value.isNew) {
      this.singleRecipeService.editStep(this.newStepForm.value);
    } else {
      const step = this.newStepForm.value;
      step.isNew = true;
      this.singleRecipeService.addStep(step);
    }
  }

  close() {
    if (this.newStepForm.value.id || this.newStepForm.value.isNew) {
      this.initForm();
    } else {
      this.closeForm.emit();
    }
  }
}
