import { _isNumberValue } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IngredientDto } from '../api/api';
import { TypeService } from '../common/services/typesService';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService extends TypeService<IngredientDto> {

  constructor(rest: RestService) {
    super("/api/ingredients", rest)
  }

}

