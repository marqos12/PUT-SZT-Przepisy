import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeComplexityName'
})
export class RecipeComplexityNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
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
