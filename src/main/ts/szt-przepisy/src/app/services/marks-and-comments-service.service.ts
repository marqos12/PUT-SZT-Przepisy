import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentDto, RecipeDto } from '../api/api';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class MarksAndCommentsServiceService {
  private commentsList: CommentDto[] = [];
  private comments = new BehaviorSubject<CommentDto[]>([]);
  private recipe: RecipeDto;
  constructor(
    private rest: RestService,
    private messageService: MessageService
  ) {
    this.init();
  }

  init() {
    this.commentsList = [];
    this.comments.next(this.commentsList);
  }

  getCommentsForRecipe(recipe: RecipeDto): Observable<CommentDto[]> {
    this.recipe = recipe;
    this.getCommentsForRecipeRequest();
    return this.comments.asObservable();
  }

  getCommentsForRecipeRequest() {
    this.rest.get(`/api/recipe/comment/${this.recipe.id}`).subscribe(this.afterCommentsGet.bind(this));
  }

  afterCommentsGet(comments: CommentDto[]) {
    this.commentsList = comments.sort(this.sortComments);
    this.comments.next(this.commentsList);
  }

  private sortComments(comment1, comment2) {
    return comment1.id - comment2.id
  }

  public changeRecipeMark(recipe: RecipeDto) {
    this.rest.post('/api/recipe/changeMark', recipe).subscribe();
  }

  public saveRecipeComment(comment) {
    const isNew = comment.isNew;
    const message = isNew ? "Dodano komentarz" : "Edytowano komentarz";
    this.rest.post('/api/recipe/comment', comment).subscribe(this.afterCommentChange.bind(this, message));
  }

  private afterCommentChange(message) {
    this.messageService.add({ severity: 'success', summary: message });
    this.getCommentsForRecipeRequest()
  }

  public deleteRecipeComment(comment) {
    this.rest.delete(`/api/recipe/comment/${comment.id}`).subscribe(this.afterCommentChange.bind(this, "Skasowano komentarz"));
  }

}
