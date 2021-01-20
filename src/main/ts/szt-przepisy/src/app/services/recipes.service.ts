import { Injectable, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { PageDto, RecipeDto } from '../api/api';
import { RestService } from './rest.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService implements OnInit {
  private recipes = new Subject<PageDto<RecipeDto>>();
  private filters: string = "";
  public pageable: {
    pageNo: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "desc"
  };

  constructor(
    private rest: RestService,
    private messageService: MessageService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
  }

  public refreshRecipesAfterFiltersChanged(filterParams) {
    this.filters = filterParams;
    this.pageable.pageNo = 0;
    this.refreshRecipes()
  }

  public refreshRecipesAfterPageableChanged(pageable) {
    this.pageable = pageable;
    this.refreshRecipes()
  }

  public refreshRecipes() {
    const recipesUrl = '/api/recipe?' + this.filters + this.pageableToString();
    this.rest.get(recipesUrl).subscribe(recipes => this.recipes.next(recipes));
  }

  private pageableToString(): string {
    return `&pageNo=${this.pageable.pageNo}&pageSize=${this.pageable.pageSize}&sortBy=${this.pageable.sortBy}&sortDirection=${this.pageable.sortDirection}`;
  }

  public getRecipes(): Observable<PageDto<RecipeDto>> {
    return this.recipes.asObservable();
  }

  public getRecipeById(id: string): Observable<RecipeDto> {
    const recipeUrl = '/api/recipe/' + id;
    return this.rest.get(recipeUrl);
  }

  public checkUserIsAuthor(params: { recipe, successCallback, errorCallback }) {
    var subscription = this.userAuthService.getLoggedUser().subscribe(user => {
      if (user && user.id == params.recipe.user.id) {
        params.successCallback();
      } else if (params.errorCallback) {
        params.errorCallback();
      }
      setTimeout(x => subscription.unsubscribe(), 1000);
    })
  }

  public addToWishlist(recipe: RecipeDto) {
    this.rest.post('/api/recipe/addToWishlist', recipe).subscribe(this.afterWishlistChanged.bind(this, true))
  }

  private afterWishlistChanged(add: boolean) {
    this.refreshRecipes();
    this.messageService.add({ severity: 'success', summary: "Zaktualizowano listę planowanych", detail: add ? "Dodano przepis" : "Skasowano przepis" });
  }

  public removeFromWishlist(recipe: RecipeDto) {
    this.rest.post('/api/recipe/removeFromWishlist', recipe).subscribe(this.afterWishlistChanged.bind(this, false));
  }
}
