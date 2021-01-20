import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentDto, RecipeDto } from 'src/app/api/api';
import { MarksAndCommentsServiceService } from 'src/app/services/marks-and-comments-service.service';
import { CommentFormComponent } from './comment-form/comment-form.component';

@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.scss']
})
export class RecipeCommentsComponent implements OnInit, OnDestroy {

  @Input() recipe: RecipeDto;
  @ViewChild(CommentFormComponent) commentFormComponent;

  comments: CommentDto[] = [];
  commentsSubscription: Subscription;


  constructor(private marksAndCommentsServiceService: MarksAndCommentsServiceService) { }

  ngOnInit(): void {
    this.registerCommentsListener();
  }

  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
  }

  registerCommentsListener() {
    this.commentsSubscription = this.marksAndCommentsServiceService.getCommentsForRecipe(this.recipe).subscribe(this.afterCommentsRefresh.bind(this))
  }

  afterCommentsRefresh(comments: CommentDto[]) {
    this.comments = comments;
  }

  check() {
    this.marksAndCommentsServiceService.changeRecipeMark(this.recipe);
  }

  onCommentEditClicked(comment) {
    this.commentFormComponent.initFormByComment(comment);
  }

}
