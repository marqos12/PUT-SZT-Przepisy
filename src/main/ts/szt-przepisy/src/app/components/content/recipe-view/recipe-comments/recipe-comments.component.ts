import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentDto, RecipeDto, UserDto } from 'src/app/api/api';
import { MarksAndCommentsServiceService } from 'src/app/services/marks-and-comments-service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
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
  user: UserDto;
  userChangeSubscription: Subscription;


  constructor(
    private marksAndCommentsServiceService: MarksAndCommentsServiceService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.registerCommentsListener();
    this.registerUserChangeListener();
  }

  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
    this.userChangeSubscription.unsubscribe();
  }

  registerCommentsListener() {
    this.commentsSubscription = this.marksAndCommentsServiceService.getCommentsForRecipe(this.recipe).subscribe(this.afterCommentsRefresh.bind(this))
  }

  afterCommentsRefresh(comments: CommentDto[]) {
    this.comments = comments;
  }

  registerUserChangeListener() {
    this.userChangeSubscription = this.userAuthService.getLoggedUser().subscribe(this.onUserChange.bind(this));
  }

  onUserChange(user: UserDto) {
    this.user = user;
  }

  check() {
    this.marksAndCommentsServiceService.changeRecipeMark(this.recipe);
  }

  onCommentEditClicked(comment) {
    this.commentFormComponent.initFormByComment(comment);
  }

}
