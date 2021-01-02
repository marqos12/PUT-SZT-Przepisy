import { Injectable } from '@angular/core';
import { RecipeTypeDto } from '../api/api';
import { TypeService } from '../common/services/typesService';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeTypesService extends TypeService<RecipeTypeDto> {

  constructor(rest: RestService) {
    super("/api/recipeTypes", rest)
  }

}
