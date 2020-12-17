import { _isNumberValue } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IngredientDto } from '../api/api';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private ingredients = new BehaviorSubject<IngredientDto[]>([]);

  constructor(private rest: RestService) {
    this.getAllIngredientsRequest();
  }

  private getAllIngredientsRequest() {
    this.rest.get<IngredientDto[]>("/api/ingredients").subscribe(this.onAllIngredientsResponse.bind(this))
  }

  public onAllIngredientsResponse(ingredients: IngredientDto[]) {
    this.ingredients.next(ingredients);
  }

  public getAllIngredients(): Observable<IngredientDto[]> {
    return this.ingredients.asObservable();
  }
}

