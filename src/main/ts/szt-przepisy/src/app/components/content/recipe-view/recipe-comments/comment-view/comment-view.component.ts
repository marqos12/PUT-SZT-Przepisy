import { Component, Input, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentDto, UserDto } from 'src/app/api/api';
import { MarksAndCommentsServiceService } from 'src/app/services/marks-and-comments-service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit, OnDestroy {
  @Input() comment: CommentDto;
  @Output() onEditClick = new EventEmitter();

  user: UserDto;
  userSubscription: Subscription;

  constructor(
    private userAuthService: UserAuthService,
    private marksAndCommentsServiceService: MarksAndCommentsServiceService
  ) { }

  ngOnInit(): void {
    this.registerUserListener();
  }

  registerUserListener() {
    this.userSubscription = this.userAuthService.getLoggedUser().subscribe(this.onUserUpdate.bind(this));
  }

  onUserUpdate(user: UserDto) {
    this.user = user;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  edit() {
    this.onEditClick.emit();
  }

  remove() {
    this.marksAndCommentsServiceService.deleteRecipeComment(this.comment);
  }

}
