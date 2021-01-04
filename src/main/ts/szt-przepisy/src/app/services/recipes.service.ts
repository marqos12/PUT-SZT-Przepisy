import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageDto, RecipeDto, RecipeFilters, RecipeIngredientDto } from '../api/api';
import { RestService } from './rest.service';

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

  constructor(private rest: RestService) { }

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

}
