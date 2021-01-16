import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepDto } from 'src/app/api/api';

@Component({
  selector: 'app-recipe-step',
  templateUrl: './recipe-step.component.html',
  styleUrls: ['./recipe-step.component.scss']
})
export class RecipeStepComponent implements OnInit {

  @Output() onEditClick = new EventEmitter();
  @Output() onRemoveClick = new EventEmitter();
  @Output() onChangeNumber = new EventEmitter();

  @Input() step: StepDto;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.onEditClick.emit();
  }

  remove() {
    this.onRemoveClick.emit();
  }

  down() {
    this.onChangeNumber.emit(2)
  }

  up() {
    this.onChangeNumber.emit(-2)
  }

}
