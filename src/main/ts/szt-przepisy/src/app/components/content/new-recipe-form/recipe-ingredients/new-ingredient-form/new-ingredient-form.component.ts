import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-ingredient-form',
  templateUrl: './new-ingredient-form.component.html',
  styleUrls: ['./new-ingredient-form.component.scss']
})
export class NewIngredientFormComponent implements OnInit {

  newIngredientForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  text: string;

  results: string[];

  search(event) {
    this.results = ["test", "test", "test", "test"];

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newIngredientForm = this.formBuilder.group({
      name: '',
      unit: '',
      quantity: '',
      required: true,
    })
  }

}
