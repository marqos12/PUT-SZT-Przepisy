import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from '../api/api';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private rest: RestService) { }

  public getRecipes(filterParams): Observable<RecipeDto[]> {
    const recipesUrl = '/api/recipe' + filterParams;

    return this.rest.get(recipesUrl);
  }

}
