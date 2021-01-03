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

  protected mapValue(value) {
    return {
      value: value,
      name: this.translateComplexityName(value)
    }
  }

  translateComplexityName(value: RecipeComplexity) {
    switch (value) {
      case "VERY_ESY":
        return "Bardzo łatwy";
      case "EASY":
        return "Łatwy";
      case "MEDIUM":
        return "Średni";
      case "HARD":
        return "Trudny";
      case "VERY_HARD":
        return "Bardo trudny";
      case "PERFECT_HOUSEWIFE":
        return "Perfekcyjna pani domu";
      default:
        return value;
    }
  }

}
