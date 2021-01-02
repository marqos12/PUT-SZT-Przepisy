import { Injectable } from '@angular/core';
import { RecipeComplexity } from '../api/api';
import { TypeService } from '../common/services/typesService';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ComplexityLevelsService extends TypeService<RecipeComplexity> {

  constructor(rest: RestService) {
    super("/api/complexityLevels", rest)
  }

}
