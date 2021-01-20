import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentDto, RecipeDto } from 'src/app/api/api';
import { MarksAndCommentsServiceService } from 'src/app/services/marks-and-comments-service.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() recipe: RecipeDto;
  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private marksAndCommentsServiceService: MarksAndCommentsServiceService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    })
  }

  public initFormByComment(comment: CommentDto) {
    this.commentForm = this.formBuilder.group({
      content: [comment.content, Validators.required],
      original: comment
    })
  }

  onAddComment() {
    if (this.commentForm.valid) {
      this.addOrEditComment();
      this.initForm();
    } else {
      this.commentForm.controls.content.markAsDirty();
    }
  }

  addOrEditComment() {
    let comment = this.commentForm.value
    if (comment.original) {
      const original = comment.original;
      original.content = comment.content;
      original.isEdited = true;
      comment = original;
    }
    comment.recipe = this.recipe;
    this.marksAndCommentsServiceService.saveRecipeComment(comment);
  }

  close() {
    this.initForm();
  }
}
